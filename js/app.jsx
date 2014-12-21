var React = require('react');
var data = require('./data/exampledata.js');
var Parse = require('parse').Parse;
var $ = require('jquery');


var GradeInterface = require('./components/GradeInterface.jsx');

Parse.initialize("YRVhtnfDL4IX6W7znnrrUnQSzRxB1f7crLlkSdwi", "PVfrvb89Po3xxnvZg31PDN63elpXv7UrPglAltyO");


var TestObject = Parse.Object.extend("TestObject");
var testObject = new TestObject();
testObject.save({foo: "bam"}).then(function(object) {
});

React.render(
    <GradeInterface
        passageName="Robinson Crusoe"
        passage={data}
        studentName="Samantha F."
    />,
    document.getElementsByTagName('body')[0]);