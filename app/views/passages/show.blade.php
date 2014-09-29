@extends(Config::get('Sentinel::config.layout'))

@section('content')

    <div class="container">
        <h1>{{ $passage->title }}</h1>
        <div class="text">
            {{ $passage->text }}
        </div>
    </div>

@endsection