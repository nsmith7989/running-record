var React = require('react');
var _ = require('lodash');
var removeNonAlpha = require('../utils/removeNonAlpha');

module.exports = React.createClass({

    render: function() {

        var errorCodeGroups = _.groupBy(this.props.incorrectWords, function(item) {
            return item.errorCode;
        });

        return (
            <div className="container">
                <div className="incorrect-results">
                    <ul>
                        {Object.keys(errorCodeGroups).map(function(letter) {
                            var words = errorCodeGroups[letter].map(incorrectObj => removeNonAlpha(incorrectObj.word)).join(', ');

                            return (
                                <li><strong>{letter}: </strong>{words}</li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        )
    }
});