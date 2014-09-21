@extends(Config::get('Sentinel::config.layout'))

{{-- Web site Title --}}
@section('title')
@parent
Groups
@stop

{{-- Content --}}
@section('content')
    @if (Sentry::check() )

        <hr/>

        <div class="row">
            <div class="container">
                <h1>Scoring Interface</h1>

                <div class="text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium corporis cumque cupiditate deleniti dolor doloribus et ex fugit hic in ipsum iste laborum magni maxime minus molestias nemo nisi nobis non nulla odio optio praesentium quos reiciendis rem, sint totam ullam unde velit veniam veritatis vero voluptate, voluptatem voluptatibus!
                </div>

                <a href="#" class="scored-button" onclick="stop();">Stop</a>
                <a href="#" class="score-button" onclick="record();">Start Recording</a>

                <div class="audio-player"></div>


                <script src="{{ URL::asset('bower_components/Recorderjs/recorder.js') }}"></script>
                <script src="{{ URL::asset('js/audio.js') }}"></script>

            </div>
        </div>

    @endif
@stop

