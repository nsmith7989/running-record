var React = require('react'),
    Parse = window.Parse,
    UserActions = require('../actions/UserActions'),
    RouteActions = require('../actions/RouteActions'),
    NotificationActions = require('../actions/NotificationActions.js');



module.exports = React.createClass({

    handleLoginAttempt: (e) => {
        e.preventDefault();

        UserActions.login({
            user: e.currentTarget[0].value,
            pass: e.currentTarget[1].value
        });

    },

    getInitialState: () => {
        return {
            loginForm: true
        }
    },

    handleCreateSwitch: function() {
        this.setState({
            loginForm: false
        });
        RouteActions.navigate('/login/register');
    },

    handleUserCreateAttempt: function(e) {
        e.preventDefault();
        if (e.currentTarget[1].value !== e.currentTarget[2].value) {
            this.setState({
                signupError: 'Passwords do not match'
            });
        } else {
            UserActions.create({
                user: e.currentTarget[0].value,
                pass: e.currentTarget[1].value
            });
        }

    },

    render: function() {

        var loginForm = (
            <form onSubmit={this.handleLoginAttempt} className="login-form" noValidate>
                <h2>Login</h2>
                <input placeholder="Email" type="email"/>
                <input placeholder="Password" type="password"/>
                <input type="submit"/>
                <a onClick={this.handleCreateSwitch}>Or Register for An Account</a>
            </form>

        );


        var signupForm = (
            <form onSubmit={this.handleUserCreateAttempt} noValidate>
                <h2>Create New User</h2>
                <p className="error">{this.state.signupError}</p>
                <input name="user_email" type="email" placeholder="Email*"/>
                <input name="user_pass" type="password" placeholder="Password*"/>
                <input name="user_pass_verify" type="password" placeholder="Reenter Password*"/>
                <input type="submit" />
            </form>
        );

        return (
            <div className="container">
                <div className="login-wrap">
                    {this.state.loginForm ? loginForm : signupForm}
                </div>

            </div>
        )
    }
});