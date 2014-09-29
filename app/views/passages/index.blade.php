@extends(Config::get('Sentinel::config.layout'))

@section('content')
    <ul class="table-list">
        @foreach($passages as $passage)
            <li>
                <div class="container student-list">
                    <div class="name">
                        <a href="/passages/{{ $passage->id }}">{{ $passage->title; }}</a>
                    </div>
                    <div class="level">Reading Level {{ $passage->reading_level }}</div>
                    <div class="status">
                        <a class="complete-score-button" href="">Finish Scoring</a>
                    </div>
                </div>
            </li>
        @endforeach
    </ul>
@endsection

