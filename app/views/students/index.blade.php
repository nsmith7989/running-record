@extends(Config::get('Sentinel::config.layout'))

@section('content')
    <ul class="table-list">

        @foreach($user->students as $student)
            <li>
                <div class="container student-list">
                    <div class="name">
                        <a href="/students/{{ $student->id }}">{{ $student->name }}</a>
                    </div>

                    <div class="level">
                        {{ $student->reading_level }}
                    </div>
                    <div class="status">
                        <a class="complete-score-button" href="">Finish Scoring</a>
                    </div>
                </div>
            </li>

        @endforeach


        {{--<li>--}}
            {{--<div class="container student-list">--}}
                {{--<div class="name">--}}
                    {{--<a href="/passages/{{ $passage->id }}">{{ $passage->title; }}</a>--}}
                {{--</div>--}}
                {{--<div class="level">Reading Level {{ $passage->reading_level }}</div>--}}
                {{--<div class="status">--}}
                    {{--<a class="complete-score-button" href="">Finish Scoring</a>--}}
                {{--</div>--}}
            {{--</div>--}}
        {{--</li>--}}
    </ul>
@endsection

