var React = require('react');

module.exports = React.createClass({

    render: function() {
        var currentWord = this.props.currentWord || 1;
        var percentageIncorrect = ((this.props.incorrectPositions.length / currentWord) * 100);
        var percentageCorrect = (100 - percentageIncorrect).toFixed(2);
        var percentComplete = (((currentWord +1) / this.props.totalWords) * 100).toFixed(2);

        return (
            <div className="stats">
                <div className="percentage-correct">
                    <div className="label">% Correct</div>
                    {percentageCorrect}%
                </div>
                <div className="number-incorrect">
                    <div className="label">Incorrect</div>
                    {this.props.incorrectPositions.length}
                </div>
            </div>
        )
    }
});