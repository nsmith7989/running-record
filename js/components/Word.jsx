var React = require('react/addons');
var _ = require('lodash');

var ErrorBlock = React.createClass({

    render: function() {
        var code = _.find(this.props.incorrectWords, {'position': this.props.index}).errorCode;
        return <span className="error-code">{code}</span>
    }
});


var Word = React.createClass({

    //shouldComponentUpdate: function(nextProps, nextState) {
    //    //only update if we are within 3 of the active
    //    return Math.abs(nextProps.indexPos - nextProps.currentWord) < 3;
    //},

    render: function() {

        this.activeClass = {
            word: true,
            active: this.props.indexPos == this.props.currentWord,
            incorrect: this.props.incorrectPositions.indexOf(this.props.indexPos) > -1
        };

        //loop over all incorrect words
        var className = React.addons.classSet(this.activeClass);

        return (
            <span className="word-wrap" onClick={this.props.makeActiveOnClick.bind(null, this.props.indexPos)}>
                {this.props.incorrectPositions.indexOf(this.props.indexPos) > -1 ? <ErrorBlock {...this.props} index={this.props.indexPos} /> : ''}
                <span className={className}>
                    <span className="punct" dangerouslySetInnerHTML={{__html: this.props.word.before}} />
                    <span dangerouslySetInnerHTML={{__html: this.props.word.word}} />
                    <span className="punct">{this.props.word.after}</span>
                </span>
            </span>
        )
    }
});

module.exports = Word;