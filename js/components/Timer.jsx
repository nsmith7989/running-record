var React = require('react');

function padNum (num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

module.exports = React.createClass({

    render: function() {

        var secondsTotalSeconds = Math.round(this.props.timeElapsed / 1000);

        var minutes = (secondsTotalSeconds / 60) % 60;
        var seconds = (secondsTotalSeconds % 60);


        return (
            <div className="timer-wrapper">
                <div className="label">Timer</div>
                <div className="timer">
                    {padNum(Math.floor(minutes), 2) + " : "} {padNum(seconds,2)}
                </div>
            </div>
        )
    }
});