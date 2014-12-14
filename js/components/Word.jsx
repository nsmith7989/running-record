var React = require('react/addons');


var Word = React.createClass({
    render: function() {

        //loop over all incorrect words

        var className = React.addons.classSet({
            word: true,
            active: this.props.indexPos == this.props.currentWord,
            incorrect: this.props.incorrectPositions.indexOf(this.props.indexPos) > -1
        });
        return (
            <span className={className}>{this.props.word}</span>
        )
    }
});

module.exports = Word;