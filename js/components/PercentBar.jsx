var React = require('react');

module.exports = React.createClass({

    render: function() {
        var currentWord = this.props.currentWord || 1;
        var style = {
            width: (((currentWord +1) / this.props.totalWords) * 100) + '%'
        };

        return (
            <div className="percentBar-wrapper">
                <div style={style} className="bar"></div>
            </div>
        )
    }
});