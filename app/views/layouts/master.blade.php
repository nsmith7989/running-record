<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Running Record</title>
        <link rel="stylesheet" href="{{ URL::asset('css/style.css') }}">
        @yield('style')
    </head>
    <body>
        <header>
            <div class="container">
                <div class="columns col12"><h1>Running Records @yield('user')</h1></div>
                <div class="columns col12 last"><a class="button" href="index.html">Teacher Dashboard</a> </div>
            </div>
        </header>
        @yield('content')
    </body>
</html>