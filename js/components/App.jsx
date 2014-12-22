var React = require('react'),
    Parse = window.Parse,
    $ = require('jquery'),
    Router = require('react-router'),
    { Route, RouteHandler, Link, DefaultRoute, NotFoundRoute } = Router,
    AppHeader = require('./Header.jsx'),
    AppFooter = require('./Footer.jsx'),
    Login = require('./Login.jsx'),
    UserStore = require('../stores/UserStore.js');


var GradeInterface = require('./GradeInterface.jsx');

function getUserState() {
    return {
        loggedIn: UserStore.getUserState(),
        errors: UserStore.getError(),
        success: UserStore.getSuccess()
    }
}

var App = React.createClass({

    getInitialState: function() {
        return getUserState()
    },

    componentWillMount: function() {
        UserStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        UserStore.removeChangeListener(this._onChange);
    },


    render: function() {


        return (
            <body>
                <AppHeader {...this.state} />
                <div className="main">
                    {this.state.loggedIn ? 'We are logged in' : <Login handleLogin={this.handleLoginAttempt} {...this.state} /> }
                </div>
                <AppFooter />

            </body>
        )
    },

    _onChange: function() {
        this.setState(getUserState());
    }
});

module.exports = App;