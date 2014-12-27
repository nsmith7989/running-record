var React = require('react');
var _ = require('lodash');
var removeNonAlpha = require('../utils/removeNonAlpha');

function padNum (num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

module.exports = React.createClass({

    render: function() {

        var errorCodeGroups = _.groupBy(this.props.incorrectWords, function(item) {
            return item.errorCode;
        });

        var currentWord = this.props.currentWord || 1;
        var percentageIncorrect = ((this.props.incorrectPositions.length / currentWord) * 100);
        var percentageCorrect = (100 - percentageIncorrect).toFixed(2);

        var secondsTotalSeconds = Math.round(this.props.timeElapsed / 1000);

        var minutes = (secondsTotalSeconds / 60) % 60;
        var seconds = (secondsTotalSeconds % 60);

        return (
            <div className="container">
                <div className="incorrect-results">
                    <h3>Incorrect Words ({this.props.incorrectPositions.length})</h3>
                    <ul>
                        {Object.keys(errorCodeGroups).map(function(letter) {

                            var words = errorCodeGroups[letter].map(incorrectObj => {
                                console.log(incorrectObj.word.word);
                                return incorrectObj.word.word
                            }).join(', ');
                            return (
                                <li><strong>{letter}: </strong>{words}</li>
                            );
                        })}
                    </ul>
                    <div className="score">
                        <h3>Score</h3>
                        <div>
                            <strong>% Correct:</strong> {percentageCorrect}%
                        </div>
                        <div>
                            <strong>Incorrect:</strong> {this.props.incorrectPositions.length}
                        </div>
                        <div>
                            <strong>Time:</strong> {padNum(Math.floor(minutes), 2) + " : "} {padNum(seconds,2)}
                        </div>
                    </div>
                    <div className="submit-wrap">
                        <button onClick={this.props.submit}>Submit Test</button>
                        <button className="dangerous-action">Reject Test</button>
                    </div>

                </div>
            </div>
        )
    }
});