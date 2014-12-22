var React = require('react/addons');

var Header = require('./Header.jsx');
var Word = require('./Word.jsx');
var TestInfo = require('./TestInfo.jsx');
var Footer = require('./Footer.jsx');
var Results = require('./Results.jsx');


module.exports = React.createClass({

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

                if (this.state.incorrectPositions.indexOf(position) !== -1) return;

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

    componentWillMount: function() {

        this.wordArray = this.props.passage.split(' ').filter(function(word) {
            if(word) return true;
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
                <Header />
                <TestInfo
                    {...this.props}
                    {...this.state}
                    startTimer={this.startTimer}
                    stopTimer={this.stopTimer}
                    restartTimer={this.restartTimer}
                    timeElapsed={this.state.timeElapsed}
                    totalWords={this.wordArray.length} />
                <div className="text container">
                    {this.wordArray.map(function(item, i) {
                        return <Word
                            currentWord={this.state.currentWord}
                            incorrectWords={this.state.incorrectWords}
                            indexPos={i} key={i}
                            incorrectPositions={this.state.incorrectPositions}
                            word={item}
                        />
                    }.bind(this))}
                </div>
                {this.state.showResults ? <Results {...this.state} /> : ''}
                <div className="container">
                    <button onClick={this.handleResultsClick} className="finish-btn">Stop Timer and Show Score</button>
                </div>
                <Footer></Footer>

            </div>
        );
    }
});