var React = require('react');

module.exports = React.createClass({

    render: function() {


        return (
            <div className="play-controls">
                <img onClick={this.props.restartTimer} src="img/stop.svg"/>
                {this.props.running ? <img onClick={this.props.stopTimer} src="img/pause.svg"/> : <img onClick={this.props.startTimer} src="img/play.svg"/>}
            </div>
        )
    }
});