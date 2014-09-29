<?php

class HomeController extends BaseController {

    /*
    |--------------------------------------------------------------------------
    | Default Home Controller
    |--------------------------------------------------------------------------
    |
    | You may wish to use controllers instead of, or in addition to, Closure
    | based routes. That's great! Here is an example controller method to
    | get you started. To route to this controller, just add the route:
    |
    |	Route::get('/', 'HomeController@showWelcome');
    |
     */

    public function showWelcome() {
        return View::make('hello');
    }

    public function showLogin() {
        return View::make('login.index');
    }

    public function doLogin() {
        //validate info, create rules for the inputs

        $rules = array(
            'email'    => 'required|email', // make sure the email is an actual email
            'password' => 'required|alphaNum|min:6'// password can only be alphanumeric and has to be greater than 3 characters
        );

        $validator = Validator::make(Input::all(), $rules);

        if ($validator->fails()) {
            return Redirect::to('login')
                ->withErrors($validator)
                ->withInput(Input::all());
        } else {

            $userdata = array(
                'email'    => Input::get('email'),
                'password' => Input::get('password')
            );

            if (Auth::attempt($userdata)) {
                return Redirect::to('dashboard');
            } else {
                return Redirect::to('login')
                    ->with('message', 'Your user/password combination was incorrect.');
            }

        }

    }

    public function doLogout() {
        Auth::logout();

        return Redirect::to('login');

    }

}