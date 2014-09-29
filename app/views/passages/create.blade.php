@extends(Config::get('Sentinel::config.layout'))

@section('content')

{{ Form::open(array('url' => 'passages')) }}

    @if($errors->has())
        @foreach ($errors->all() as $error)
            <div class="alert alert-danger">{{ $error }}</div>
        @endforeach
    @endif

    <p>
        {{ Form::label('title', 'Title') }}
        {{ Form::text('title', null, array('placeholder' => 'Title', 'class' => 'form-control'))  }}
    </p>

    <p>
        {{ Form::label('text', 'Text') }}
        {{ Form::textarea('text', null, array('placholder' => 'Text', 'class' => 'form-control')) }}
    </p>

    <p>
        {{ Form::submit('Submit', array('class' => 'scored-button')) }}
    </p>



{{ Form::close() }}

@endsection