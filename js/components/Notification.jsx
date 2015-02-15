let React = require('react');


let Notification = React.createClass({

    render() {
        return (
            <div className="flash">
                <span className="success">
                    {this.props.message}
                </span>
            </div>
        )
    }

});

module.exports = Notification;