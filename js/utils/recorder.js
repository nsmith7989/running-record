/**
 * Created by nathanaelsmith on 1/1/15.
 */

var Recorder = require('recorderjs');
var Audio = window.Audio;

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
    navigator.getUserMedia({audio: true}, function(localMediaStream) {

        mediaStream = localMediaStream;

        //optional audio player on screen during recording
        audio = new Audio(window.URL.createObjectURL(localMediaStream));
        audio.controls = true;
        //$('.audio-player').append(audio);
        //document.body.appendChild(audio);
        //feedback is a bitch
        audio.volume = 0;
        audio.play();

        // create a stream source to pass to Recorder.js
        var mediaStreamSource = context.createMediaStreamSource(localMediaStream);

        // create new instance of Recorder.js using the mediaStreamSource
        rec = new Recorder(mediaStreamSource);

        // start recording
        rec.record();
    }, function(err) {
        console.log('Browser not supported');
    });
    return arguments.callee;
});

function stop() {
    // stop the media stream
    mediaStream.stop();

    // stop Recorder.js
    rec.stop();

    // export it to WAV
    rec.exportWAV(function(data) {
        wav = data;
    });
}

function addToPage(wav) {
    audio.src = window.URL.createObjectURL(wav);
    audio.volume = .5;
}

function sendToServer(wav, filename) {
    var fd = new FormData();
    fd.append(filename + '.wav', wav);
    rec.clear();

    var request = new XMLHttpRequest();
    request.open("POST", "//audio.running-record.com/api/audio");
    request.send(fd);

}

function getWAV() {
    return new Promise(function(resolve, reject) {
        rec.exportWAV(function(data){
            resolve(data);
        });
    });

}

module.exports = {
    record: record,
    stop: stop,
    sendToServer: sendToServer,
    getWAV: getWAV
};