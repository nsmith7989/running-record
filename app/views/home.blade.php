@extends(Config::get('Sentinel::config.layout'))

{{-- Web site Title --}}
@section('title')
@parent
Groups
@stop

{{-- Content --}}
@section('content')
    @if (Sentry::check() )
    	<div class="panel panel-success">
    		 <div class="panel-heading">
    		    <h1>Scoring Interface</h1>
    		</div>
    		<div class="panel-body">

                <div class="text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium corporis cumque cupiditate deleniti dolor doloribus et ex fugit hic in ipsum iste laborum magni maxime minus molestias nemo nisi nobis non nulla odio optio praesentium quos reiciendis rem, sint totam ullam unde velit veniam veritatis vero voluptate, voluptatem voluptatibus!
                </div>

    		</div>
    	</div>
    @endif
@stop

