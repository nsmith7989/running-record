var React = require('react/addons');


var Word = React.createClass({

    componentWillUpdate: function() {
        if (Object.keys(this.refs).length) {
            if (this.props.indexPos == this.props.currentWord) {
                this.refs[this.props.indexPos].getDOMNode().focus();
            } else {
                this.refs[this.props.indexPos].getDOMNode().blur();
            }
        }
    },

    render: function() {

       this.activeClass = {
           word: true,
           active: this.props.indexPos == this.props.currentWord,
           incorrect: this.props.incorrectPositions.indexOf(this.props.indexPos) > -1
       };

        //loop over all incorrect words
        var className = React.addons.classSet(this.activeClass);

        return (
            <span className="word-wrap">
                {this.props.incorrectPositions.indexOf(this.props.indexPos) > -1 ? <input onChange={this.props.onErrorCode} ref={this.props.indexPos} type="text" /> : ''}
                <span className={className}>{this.props.word}</span>
            </span>
        )
    }
});

module.exports = Word;