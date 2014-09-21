var navigator = window.navigator;
navigator.getUserMedia = (
navigator.getUserMedia ||
navigator.webkitGetUserMedia ||
navigator.mozGetUserMedia ||
navigator.msGetUserMedia
);

var Context = window.AudioContext || window.webkitAudioContext;
var context = new Context();


var mediaStream;
var rec;
var wav;
var video;
var streamRecorder;
var audio;

record = (function() {
    // ask for permission and start recording
    navigator.getUserMedia( {audio: true}, function(localMediaStream) {

        mediaStream = localMediaStream;

        //optional audio player on screen during recording
        audio = new Audio( window.URL.createObjectURL( localMediaStream ) );
        audio.controls = true;
        $( '.audio-player' ).append( audio );
        //document.body.appendChild(audio);
        //feedback is a bitch
        audio.volume = 0;
        audio.play();

        // create a stream source to pass to Recorder.js
        var mediaStreamSource = context.createMediaStreamSource( localMediaStream );

        // create new instance of Recorder.js using the mediaStreamSource
        rec = new Recorder( mediaStreamSource, {
            // pass the path to recorderWorker.js file here
            workerPath: '/bower_components/Recorderjs/recorderWorker.js'
        } );

        // start recording
        rec.record();
    }, function(err) {
        console.log( 'Browser not supported' );
    } );
    return arguments.callee;
});

function stop() {
    // stop the media stream
    mediaStream.stop();

    // stop Recorder.js
    rec.stop();

    // export it to WAV
    rec.exportWAV( function(wav) {
        window.wav = wav;
        sendToServer( wav );
        addToPage( wav );
        console.log( wav );
    } );
}

function addToPage(wav) {
    audio.src = window.URL.createObjectURL( wav );
    audio.volume = .5;
}

function sendToServer(wav) {
    var fd = new FormData();
    //key value of things to be sent
    fd.append( 'data', wav );
    rec.clear();
    //send to parse
    var arrayBuffer;
    var fileReader = new FileReader();
    //fileReader.onload = function() {
    //    arrayBuffer = this.result;
    //};
    //
    //var parseFile = new Parse.File('thing.wav', fileReader.readAsArrayBuffer(wav), 'audio/x-wav');
    //parseFile.save();
}