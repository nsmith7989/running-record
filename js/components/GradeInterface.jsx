var React = require('react/addons');
var Word = require('./Word.jsx');
var TestInfo = require('./TestInfo.jsx');
var Results = require('./Results.jsx');
var TestActions = require('../actions/TestActions');
var StudentStore = require('../stores/StudentStore');
var PassageStore = require('../stores/PassageStore');

var GradingInterface = React.createClass({

    submitTest: function() {
        TestActions.create(
            this.state,
            StudentStore.getCurrentStudent().id,
            PassageStore.getCurrentPassage().id
        )
    },

    handleKeyDown: function(e) {

        switch(e.keyCode) {
            case 39: //key code right arrow
                e.preventDefault();
                //if the timer is not running start it
                if(!this.state.running) this.startTimer();

                if(this.state.currentWord + 1 == this.wordArray.length) {
                    this.stopTimer();
                }

                this.setState({
                    currentWord: this.state.currentWord + 1
                });
                break;
            case 37: // key cod left arrow
                e.preventDefault();
                //if the timer is not running start it
                if(!this.state.running) this.startTimer();

                this.setState({
                    currentWord: this.state.currentWord - 1
                });
                break;
            //case 32: // key code spacebar
            default:
                e.preventDefault();
                //if the timer is not running start it
                if(!this.state.running) this.startTimer();

                var position = this.state.currentWord;

                var incorrectWord = this.wordArray[position];

                if(this.state.incorrectPositions.indexOf(position) !== -1) return;

                this.setState({
                    //currentWord: this.state.currentWord + 1,
                    incorrectWords: React.addons.update(this.state.incorrectWords, {
                        $push: [{
                            position: position,
                            word: incorrectWord,
                            errorCode: String.fromCharCode(e.keyCode)
                        }]
                    }),
                    incorrectPositions: React.addons.update(this.state.incorrectPositions, {
                        $push: [position]
                    })
                });
                break;
        }
    },

    getInitialState: function() {
        return {
            currentWord: -1,
            incorrectWords: [],
            incorrectPositions: [],
            timeElapsed: 0,
            running: false,
            enteringErrorCode: false,
            showResults: false
        }
    },

    startTimer: function() {

        this.timer = setInterval(this.tick, 1000);
        this.setState({
            running: true
        });
    },

    stopTimer: function() {
        clearInterval(this.timer);
        this.setState({
            running: false
        });
    },

    restartTimer: function() {
        clearInterval(this.timer);
        this.setState({
            running: false,
            timeElapsed: 0
        })
    },

    componentDidMount: function() {
        window.addEventListener('keydown', this.handleKeyDown);
    },

    componentWillUnmount: function() {
        window.removeEventListener('keydown', this.handleKeyDown);
        clearInterval(this.timer);
    },

    componentWillMount: function() {

        var passage = this.props.passage;
        var wordCount = 0;

        this.paragraphs = passage.split(/\n|\r/g).map(function(paragraph) {
            return paragraph.split(/\s/g).filter(function(word) { if (word) return word;}).map(function(word) {
                var wordObj = {};
                wordObj.word = word;
                wordObj.count = wordCount;
                var regex = /[^A-Za-z]/g;
                if(regex.test(word.charAt(0))) {
                    wordObj.before = word.charAt(0);
                    wordObj.word = word.substring(1);
                }
                if(regex.test(word.substring(word.length - 1))) {
                    wordObj.after = word.substring(word.length - 1);
                    wordObj.word = wordObj.word.substring(0, wordObj.word.length - 1);
                }
                wordCount++;
                return wordObj;
            })
        });

        this.wordArray = passage.split(' ').filter(function(word) { if (word) return word;});

        this.wordArray = this.wordArray.map(function(word) {
            var wordObj = {};
            wordObj.word = word;
            return wordObj;
        });


    },

    tick: function() {

        this.setState({
            timeElapsed: this.state.timeElapsed + 1000
        })
    },

    handleResultsClick: function() {
        this.stopTimer();
        this.setState({
            showResults: true
        })
    },

    render: function() {

        return (
            <div>
                <TestInfo
                    {...this.props}
                    {...this.state}
                    startTimer={this.startTimer}
                    stopTimer={this.stopTimer}
                    restartTimer={this.restartTimer}
                    timeElapsed={this.state.timeElapsed}
                    totalWords={this.wordArray.length} />
                <div className="text container">
                    {this.paragraphs.map(function(paragraph) {
                        return (
                            <p>
                                {paragraph.map(function(item, i) {
                                    return (
                                        <Word
                                            currentWord={this.state.currentWord}
                                            incorrectWords={this.state.incorrectWords}
                                            indexPos={item.count} key={item.count}
                                            incorrectPositions={this.state.incorrectPositions}
                                            word={item}
                                        />
                                    )
                                }.bind(this))}
                            </p>
                        )
                    }.bind(this))}
                </div>
                {this.state.showResults ?
                    <Results {...this.state} submit={this.submitTest} /> :
                    <div className="container">
                        <button onClick={this.handleResultsClick} className="finish-btn">Stop Timer and Show Score</button>
                    </div>}


            </div>
        );
    }
});

module.exports = GradingInterface;