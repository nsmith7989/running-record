<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

//everything behind auth, for now
Route::get('/', function () {
    return View::make('home');
});


Route::group(array('before' => 'auth'), function () {

    Route::resource('passages', 'PassagesController');
    Route::resource('students', 'StudentsController');
    Route::get('dashboard', function() {
        return View::make('running-record');
    });

});


// =======================================
// Login Routes
// =======================================

//shows the login form
Route::get('login', array(
    'uses' => 'HomeController@showLogin',
));

Route::post('login', array(
    'uses' => 'HomeController@doLogin',
));

Route::get('logout', array(
    'uses' => 'HomeController@doLogout',
));