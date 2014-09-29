<?php

class UsersController extends \BaseController {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index() {

        $users = User::all();

        //load in the view and pass in all users
        return View::make('users.index')
            ->with('users', $users);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create() {
        return View::make('users.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store() {

        $rules = array(
            'firstname' => 'required|min:2',
            'lastname'  => 'required|min:2',
            'username'  => 'required|min:4',
            'email'     => 'required|email|unique:users',
            'password'  => 'required|alphaNum|min:6'// password can only be alphanumeric and has to be greater than 3 characters
        );

        $validator = Validator::make(Input::all(), $rules);

        if ($validator->fails()) {

            return Redirect::to('users/register')
                ->withErrors($validator)
                ->withInput(Input::all());

        } else {

            $user            = new User;
            $user->firstname = Input::get('firstname');
            $user->lastname  = Input::get('lastname');
            $user->email     = Input::get('email');
            $user->password  = Hash::make(Input::get('password'));
            $user->username  = Input::get('username');
            $user->save();

            return Redirect::to('login')
                ->with('message', 'Thanks '.Input::get('firstname').' you\'ve  been registered');

        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id) {

        $user = User::find($id);

        return View::make('users.edit')
            ->with('user', $user);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id) {

        $user = User::find($id);

        $rules = array(
            'firstname' => 'required|min:2',
            'lastname'  => 'required|min:2',
            'username'  => 'required|min:4',
            'email'     => 'required|email',
            'password'  => 'min:6',
        );

        $validator = Validator::make(Input::all(), $rules);

        if ($validator->fails()) {

            Session::flash('message', 'Error updating '.$user->firstname.'.');
            return Redirect::to('users')->withErrors($validator);

        } else {

            $user->firstname = Input::get('firstname');
            $user->lastname  = Input::get('lastname');
            $user->email     = Input::get('email');
            $user->username  = Input::get('username');
            if (!empty(Input::get('password'))) {
                $user->password = Hash::make(Input::get('password'));
            }
            $user->save();

            return Redirect::to('users')
                ->with('message', Input::get('firstname').' has been updated.');

        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id) {
        $user = User::find($id);
        $user->delete();

        Session::flash('message', 'Sucessfully deleted '.$user->firstname);
        return Redirect::to('users');
    }

}