var React = require('react'),
    UserActions = require('../actions/UserActions'),
    Dashboard = require('./Dashboard.jsx');

module.exports = React.createClass({


    handleLogout: function() {
        UserActions.logout();
    },


    render: function() {

        var loginBtn = this.props.loggedIn ? <a onClick={this.handleLogout} className="btn">Logout</a> : '';

        return (
            <header>
                <div className="container">
                    <div className="col8 columns">
                        Running Record
                    </div>

                    <div className="col16 last columns r-col">
                        {loginBtn}
                    {this.props.loggedIn ? <Dashboard /> : ''}
                    </div>
                </div>
            </header>
        )
    }
});