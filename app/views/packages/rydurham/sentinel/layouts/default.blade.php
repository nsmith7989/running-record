<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<title> 
			@section('title') 
			@show 
		</title>

		<meta name="viewport" content="width=device-width, initial-scale=1.0">

		<!-- Bootstrap 3.0: Latest compiled and minified CSS -->
		<!-- <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css"> -->
		<link rel="stylesheet" href="{{ asset('packages/rydurham/sentinel/css/bootstrap.min.css') }}">

		<!-- Optional theme -->
		<!-- <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-theme.min.css"> -->
		<link rel="stylesheet" href="{{ asset('packages/rydurham/sentinel/css/bootstrap-theme.min.css') }}">
		<link rel="stylesheet" href="{{ URL::asset('css/style.css') }}">

		<style>

		</style>

		<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
		<!--[if lt IE 9]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->

	
	</head>

	<body>


	<header>
        <div class="container">
            <div class="columns col12"><h1>Running Records - Ms. Gowland</h1></div>
            <div class="columns col12 last"><a class="button" href="index.html">Teacher Dashboard</a> </div>
        </div>
    </header>

    <ul class="table-list">
        <li>
            <div class="container student-list">
                <div class="name"><a href="student-dashboard.html">Eugene Hall</a></div><div class="level">Level 8</div><div class="status"><a class="complete-score-button" href="">Finish Scoring</a> </div>
            </div>
        </li>
        <li>
            <div class="container student-list">
                <div class="name"><a href="student-dashboard.html">Dan Reyes</a></div><div class="level">Level 10</div><div class="status"><a class="score-button" href="">Score 6</a></div>
            </div>
        </li>
        <li>
            <div class="container student-list">
                <div class="name"><a href="student-dashboard.html">Zoe Gonzales</a></div><div class="level">Level 16</div><div class="status"><a class="scored-button" href="">View Score</a></div>
            </div>
        </li>
        <li>
            <div class="container student-list">
                <div class="name"><a href="student-dashboard.html">Theodore Moreno</a></div><div class="level">Level 4</div><div class="status"><a class="complete-score-button" href="">Finish Scoring</a> </div>
            </div>
        </li>
        <li>
            <div class="container student-list">
                <div class="name"><a href="student-dashboard.html">Joyce Castillo</a></div><div class="level">Level 8</div><div class="status"><a class="score-button" href="">Score</a></div>
            </div>
        </li>
        <li>
            <div class="container student-list">
                <div class="name"><a href="student-dashboard.html">Ricky Watkins</a></div><div class="level">Level 10</div><div class="status"><a class="scored-button" href="">View Score</a></div>
            </div>
        </li>
    </ul>
		

		<!-- Navbar -->
		{{--<div class="navbar navbar-inverse navbar-fixed-top">--}}
	      {{--<div class="container">--}}
	        {{--<div class="navbar-header">--}}
	          {{--<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">--}}
	            {{--<span class="icon-bar"></span>--}}
	            {{--<span class="icon-bar"></span>--}}
	            {{--<span class="icon-bar"></span>--}}
	          {{--</button>--}}
	          {{--<a class="navbar-brand" href="{{ URL::route('home') }}">Sentinel</a>--}}
	        {{--</div>--}}
	        {{--<div class="collapse navbar-collapse">--}}
	          {{--<ul class="nav navbar-nav">--}}
				{{--@if (Sentry::check() && Sentry::getUser()->hasAccess('admin'))--}}
					{{--<li {{ (Request::is('users*') ? 'class="active"' : '') }}><a href="{{ URL::action('Sentinel\UserController@index') }}">Users</a></li>--}}
					{{--<li {{ (Request::is('groups*') ? 'class="active"' : '') }}><a href="{{ URL::action('Sentinel\GroupController@index') }}">Groups</a></li>--}}
				{{--@endif--}}
	          {{--</ul>--}}
	          {{--<ul class="nav navbar-nav navbar-right">--}}
	            {{--@if (Sentry::check())--}}
				{{--<li {{ (Request::is('users/show/' . Session::get('userId')) ? 'class="active"' : '') }}><a href="/users/{{ Session::get('userId') }}">{{ Session::get('email') }}</a></li>--}}
				{{--<li><a href="{{ URL::route('Sentinel\logout') }}">Logout</a></li>--}}
				{{--@else--}}
				{{--<li {{ (Request::is('login') ? 'class="active"' : '') }}><a href="{{ URL::route('Sentinel\login') }}">Login</a></li>--}}
				{{--<li {{ (Request::is('users/create') ? 'class="active"' : '') }}><a href="{{ URL::route('Sentinel\register') }}">Register</a></li>--}}
				{{--@endif--}}
	          {{--</ul>--}}
	        {{--</div><!--/.nav-collapse -->--}}
	      {{--</div>--}}
	    {{--</div>--}}
		<!-- ./ navbar -->



		<!-- Container -->
		<div class="container">
			<!-- Notifications -->
			@include('Sentinel::layouts/notifications')
			<!-- ./ notifications -->

			<!-- Content -->
			@yield('content')
			<!-- ./ content -->
		</div>

		<!-- ./ container -->

		<!-- Javascripts
		================================================== -->
		<script src="{{ URL::asset('js/build.js') }}"></script>
		<script src="{{ asset('packages/rydurham/sentinel/js/bootstrap.min.js') }}"></script>
		<script src="{{ asset('packages/rydurham/sentinel/js/restfulizer.js') }}"></script> 
		<script src="{{ URL::asset('js/scoring.js') }}"></script>
		<!-- Thanks to Zizaco for the Restfulizer script.  http://zizaco.net  -->
	</body>
</html>
