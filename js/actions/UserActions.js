var Dispatcher = require('../dispatcher/dispatcher.js');
var UserConstants = require('../constants/Constants').user;
var Parse = window.Parse;
var RouteActions = require('./RouteActions');
var NotificationActions = require('../actions/NotificationActions.js');


module.exports = {

    /**
     * @param {object} data
     * data.user && data.pass
     */
    login: function(data) {

        //resonably certain I should log in here
        Parse.User.logIn(data.user, data.pass, {
            success: function(user) {

                Dispatcher.handleViewAction({
                    actionType: UserConstants.LOG_IN,
                    data: user
                });
                RouteActions.navigate('/');

            },
            error: function(user, error) {

                NotificationActions.newNotification("Invalid email/password");

            }
        });



    },

    logout: function() {

        Parse.User.logOut();

        Dispatcher.handleViewAction({
            actionType: UserConstants.LOG_OUT
        });
        RouteActions.navigate('/');



    },

    create: function(data) {

        var user = new Parse.User();
        user.set("username", data.user);
        user.set("password", data.pass);

        user.signUp(null, {
            success: function(user) {

                // success logs a user in
                Dispatcher.handleViewAction({
                    actionType: UserConstants.LOG_IN,
                    data: user
                });

            },
            error: function(user, error) {
                Dispatcher.handleViewAction({
                    actionType: UserConstants.USER_ERROR,
                    data: error
                });

            }
        });

    }

};