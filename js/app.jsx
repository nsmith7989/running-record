var React = require('react');
var data = require('./data/exampledata.js');

var GradeInterface = require('./components/GradeInterface.jsx');


React.render(
    <GradeInterface
        passageName="Robinson Crusoe"
        passage={data}
        studentName="Samantha F."
    />,
    document.getElementsByTagName('body')[0]);