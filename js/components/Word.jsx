var React = require('react/addons');
var _ = require('lodash');

var ErrorBlock = React.createClass({

    render: function() {
        var code = _.find(this.props.incorrectWords, {'position': this.props.index}).errorCode;
        return <span className="error-code">{code}</span>
    }
});


var Word = React.createClass({

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
                {this.props.incorrectPositions.indexOf(this.props.indexPos) > -1 ? <ErrorBlock {...this.props} index={this.props.indexPos} /> : ''}
                <span className={className}>{this.props.word}</span>
            </span>
        )
    }
});

module.exports = Word;