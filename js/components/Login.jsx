var React = require('react'),
    Parse = window.Parse,
    UserActions = require('../actions/UserActions');

module.exports = React.createClass({

    handleLoginAttempt: function(e) {
        e.preventDefault();

        UserActions.login({
            user: e.currentTarget[0].value,
            pass: e.currentTarget[1].value
        });
    },

    render: function() {
        return (
            <div className="container">
                <form onSubmit={this.handleLoginAttempt} className="login-wrap" noValidate>
                    <h2>Login</h2>
                    <input placeholder="Email" type="email"/>
                    <input placeholder="Password" type="password"/>
                    <input type="submit"/>

                    <a onClick={this.props.handleRegister}>Or Register for An Account</a>

                </form>
            </div>
        )
    }
});