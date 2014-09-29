<?php

/**
 * Created by PhpStorm.
 * User: nathanaelsmith
 * Date: 9/27/14
 * Time: 20:50
 */
class AuthController extends \BaseController
{

    public function Login()
    {
        if (Auth::attempt(Input::only('email', 'password'))) {
            return Auth::user();
        } else {
            return 'invalid email/pass combo';
        }
    }

    public function isAuth()
    {
        return Response::json(['authStatus' => Auth::check()]);
    }

    public Function Logout()
    {
        Auth::logout();
        return 'logged out';
    }

} 