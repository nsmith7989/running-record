var React = require('react');
var Timer = require('./Timer.jsx');
var Controls = require('./Controls.jsx');
var Stats = require('./Stats.jsx');
var PercentBar = require('./PercentBar.jsx');

module.exports = React.createClass({

    render: function() {
        return (
            <div className="test-info">
                <div className="container">
                    <div className="info">
                        <div className="student">
                        {this.props.studentName}
                        </div>
                        <div className="passage-name">
                        {this.props.passageName}
                        </div>
                    </div>

                    <div className="controls">
                        <Timer {...this.props} />
                        {this.props.readOnly ? '' :
                            <Controls {...this.props} />
                            }
                        <Stats {...this.props}/>
                    </div>
                </div>
                <PercentBar {...this.props} />
            </div>
        )
    }
});