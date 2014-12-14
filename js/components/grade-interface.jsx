var React = require('react');

var data = require('../data/exampledata');
var Header = require('./Header.jsx');

var Word = React.createClass({
    render: function() {
        return (
            <span className="word">{this.props.word}</span>
        )
    }
});

var wordArray = data.split(' ');


module.exports = React.createClass({

    render: function() {
        return (
            <div>
                <Header />
                <div className="text container">
                    {wordArray.map(function(item, i) {
                        return <Word key={i} word={item} />
                    })}
                </div>
            </div>
        );
    }
});