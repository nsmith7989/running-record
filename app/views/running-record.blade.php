@extends('layouts.master')
{{-- Web site Title --}}
@section('title')
@parent
Groups
@stop

@section('user')
    {{ Auth::user()->email }}
@endsection

@section('content')

    <div ng-app="RunningRecord">
        <ng-view></ng-view>
    </div>


<script src="{{ URL::asset('bower_components/jquery/dist/jquery.js') }}"></script>
<script src="{{ URL::asset('bower_components/angular/angular.js') }}"></script>
<script src="{{ URL::asset('bower_components/angular-route/angular-route.js') }}"></script>

<script src="{{ URL::asset('app/controllers/StudentController.js') }}"></script>
<script src="{{ URL::asset('app/services/studentServices.js') }}"></script>
<script src="{{ URL::asset('app/controllers/PassagesListController.js') }}"></script>
<script src="{{ URL::asset('app/services/passageServices.js') }}"></script>
<script src="{{ URL::asset('app/controllers/StudentDetailController.js') }}"></script>
<script src="{{ URL::asset('app/app.js') }}"></script>


@endsection