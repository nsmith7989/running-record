var Dispatcher = require('../dispatcher/dispatcher.js');
var UserConstants = require('../constants/UserConstants');
var Parse = window.Parse;

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

            },
            error: function(user, error) {

                Dispatcher.handleViewAction({
                    actionType: UserConstants.ERROR,
                    data: error
                });

            }
        });



    },

    logout: function() {

        Parse.User.logOut();

        Dispatcher.handleViewAction({
            actionType: UserConstants.LOG_OUT
        });
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
                    actionType: UserConstants.ERROR,
                    data: error
                });

            }
        });

    }

};