var Dispatcher = require('../dispatcher/dispatcher.js');
var Parse = window.Parse;
var assign = Object.assign || require('object.assign');

var UserConstants = require('../constants/UserConstants.js');

var createStore = require('../utils/storeUtils');


var _errors = [];
var _success = [];

var UserStore = assign({}, createStore(), {
    getUserState: function() {
        return Parse.User.current() ? true : false;
    },

    getSuccess: function() {
        return _success;
    },

    getError: function() {
        return _errors;
    },

    dispatcherIndex: Dispatcher.register(function(payload) {

        var action = payload.action;

        switch(action.actionType) {

            case UserConstants.LOG_IN:

                _success = ['Successfully Logged In.'];

                UserStore.emitChange();

                break;

            case UserConstants.LOG_OUT:

                _success = ['Successfully Logged Out.'];

                UserStore.emitChange();

                setTimeout(() => {
                    _success = '';
                    UserStore.emitChange();
                }, 4000);

                break;

            case UserConstants.USER_ERROR:

                //todo: push all errors into error object
                _errors = ["Parse API Error: " + action.data.message];

                UserStore.emitChange();

                break;
        }

        return true;

    })

});


module.exports = UserStore;