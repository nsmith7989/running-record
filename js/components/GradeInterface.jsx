var React = require('react/addons');

var Header = require('./Header.jsx');
var Word = require('./Word.jsx');
var TestInfo = require('./TestInfo.jsx');


module.exports = React.createClass({

    handleKeyDown: function(e) {
        switch (e.keyIdentifier) {
            case "Right":
                e.preventDefault();
                this.setState({
                    currentWord: this.state.currentWord + 1
                });
                break;
            case "Left":
                e.preventDefault();
                this.setState({
                    currentWord: this.state.currentWord - 1
                });
                break;
            case "U+0020":
                e.preventDefault();
                var position = this.state.currentWord;
                var incorrectWord = this.wordArray[position];
                this.setState({
                    currentWord: this.state.currentWord + 1,
                    incorrectWords: React.addons.update(this.state.incorrectWords, {
                        $push: [{
                            position: position,
                            word: incorrectWord
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
            currentWord: 0,
            incorrectWords: [],
            incorrectPositions: [],
            timeElapsed: 0,
            running: false
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
            if (word) return true;
        });
    },

    tick: function() {

        this.setState({
            timeElapsed: this.state.timeElapsed + 1000
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
                <div className="text container" >
                    {this.wordArray.map(function(item, i) {
                        return <Word
                            currentWord={this.state.currentWord}
                            indexPos={i} key={i}
                            incorrectPositions={this.state.incorrectPositions}
                            word={item} />
                    }.bind(this))}
                </div>
            </div>
        );
    }
});