var Dispatcher = require('../dispatcher/dispatcher.js');
var Parse = window.Parse;
var assign = Object.assign || require('object.assign');

var EventEmitter = require('events').EventEmitter;
var UserConstants = require('../constants/UserConstants.js');
var clearFlash = require('../utils/clearFlash');


var CHANGE_EVENT = 'change';
var _errors = [];
var _success = [];

var UserStore = assign(EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        UserStore.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        UserStore.removeListener(CHANGE_EVENT, callback);
    },

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

            case UserConstants.ERROR:

                //todo: push all errors into error object
                _errors = ["Parse API Error: " + action.data.message];

                UserStore.emitChange();

                break;
        }

        return true;

    })

});

module.exports = UserStore;