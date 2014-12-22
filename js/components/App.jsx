var React = require('react'),
    Parse = window.Parse,
    $ = require('jquery'),
    Router = require('react-router'),
    { Route, RouteHandler, Link, DefaultRoute, NotFoundRoute } = Router,
    AppHeader = require('./Header.jsx'),
    AppFooter = require('./Footer.jsx'),
    Login = require('./Login.jsx'),
    UserStore = require('../stores/UserStore'),
    RouteStore = require('../stores/RouteStore'),
    assign = Object.assign || require('object.assign'),
    Students = require('./Students.jsx'),
    RouteActions = require('../actions/RouteActions'),
    Passages = require('./Passages.jsx');


var GradeInterface = require('./GradeInterface.jsx');

function getUserState() {
    return {
        loggedIn: UserStore.getUserState(),
        errors: UserStore.getError(),
        success: UserStore.getSuccess()
    }
}

function getRouteState() {
    return {
        currentRoute: RouteStore.getCurrentPath()
    }
}


var App = React.createClass({

    getInitialState: function() {
        return assign(
            getUserState(), getRouteState()
        );
    },

    componentWillMount: function() {
        UserStore.addChangeListener(this._onUserChange);
        RouteStore.addChangeListener(this._onRouteChange);
        if (window.location.hash) {
            RouteActions.navigate(window.location.hash.replace(/#/g, ''));
        }
    },

    componentWillUnmount: function() {
        UserStore.removeChangeListener(this._onUserChange);
        RouteStore.removeChangeListener(this._onRouteChange);
    },


    render: function() {
        var currentView;

        if (this.state.loggedIn) {
            switch(this.state.currentRoute) {
                case "/passages":
                    currentView = <Passages />;
                    break;
                case "/students":
                    currentView = <Students />;
                    break;
                case "/login":
                    currentView = <Login handleLogin={this.handleLoginAttempt} {...this.state} />;
                    break;
                default:
                    currentView = 'No route found - 404';
                    break;

            }
        } else {
            currentView = <Login handleLogin={this.handleLoginAttempt} {...this.state} />;
            //RouteActions.updateHash('/login');
        }


        return (
            <body>
                <AppHeader {...this.state} />
                <div className="main">
                {currentView}
                </div>
                <AppFooter />

            </body>
        )
    },


    _onUserChange: function() {
        this.setState(getUserState());
    },

    _onRouteChange: function() {
        this.setState(getRouteState());
    }

});

module.exports = App;