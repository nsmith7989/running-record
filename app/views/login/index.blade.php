@extends('layouts.master')

@section('content')

<div id="login" class="container">

    @if(Session::has('message'))
        <p class="alert alert-info">{{ Session::get('message') }}</p>
    @endif

    {{ Form::open(array('url' => 'login')) }}

    		<p>
    			{{ $errors->first('email') }}
    			{{ $errors->first('password') }}
    		</p>

    		<p>
    			{{ Form::label('email', 'Email Address') }}
    			{{ Form::text('email', Input::old('email'), array('placeholder' => 'awesome@awesome.com')) }}
    		</p>

    		<p>
    			{{ Form::label('password', 'Password') }}
    			{{ Form::password('password') }}
    		</p>

    		<p>{{ Form::submit('Submit', ['class' => 'scored-btn']) }}</p>
    	{{ Form::close() }}

</div>

@endsection