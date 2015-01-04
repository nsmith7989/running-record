var React = require('react');
var _ = require('lodash');
var TestStore = require('../stores/TestStore');

function padNum(num, size) {
    var s = num + "";
    while(s.length < size) s = "0" + s;
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



        if (this.props.audio) {
            var audio;
            var src;

            if (this.props.audio instanceof Blob) {
                src = window.URL.createObjectURL(this.props.audio);
            } else {
                src = '//audio.running-record.com/uploads/' + TestStore.getCurrentTest().id + '.mp3';
            }
            audio = (
                <div className="audio-wrap">
                    <h3>Audio</h3>
                    <audio controls="controls" src={src} />
                </div>
            );
        }

        var submitWrap = (
            <div className="submit-wrap">
                <button onClick={this.props.submit}>Submit Test</button>
                <button className="dangerous-action">Reject Test</button>
            </div>
        );

        var notes = (
          <div>
              <h3>Notes</h3>
              <textarea onChange={this.props.handleNotesChange} value={this.props.notesValue} />
          </div>
        );

        notes = this.props.readOnly ? (
            <div>
                <h3>Notes</h3>
                <p>{this.props.notesValue}</p>
            </div>
        ) : notes;


        return (
            <div className="container">
                <div className="incorrect-results">
                    <h3>Incorrect Words ({this.props.incorrectPositions.length})</h3>
                    <ul>
                        {Object.keys(errorCodeGroups).map(function(letter) {

                            var words = errorCodeGroups[letter].map(incorrectObj => {
                                return incorrectObj.word.word
                            }).join(', ');
                            return (
                                <li>
                                    <strong>{letter}: </strong>{words}</li>
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
                            <strong>Time:</strong> {padNum(Math.floor(minutes), 2) + " : "} {padNum(seconds, 2)}
                        </div>
                    </div>
                        {audio}
                        {notes}
                    {this.props.readOnly ? '' : submitWrap}

                </div>
            </div>
        )
    }
});