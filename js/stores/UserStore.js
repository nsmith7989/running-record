var Dispatcher = require('../dispatcher/dispatcher.js');
var Parse = window.Parse;

var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var UserConstants = require('../constants/UserConstants.js');

var CHANGE_EVENT = 'change';

var UserStore = merge(EventEmitter.prototype, {

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

    dispatcherIndex: Dispatcher.register(function(payload) {

        var action = payload.action;

        switch(action.actionType) {

            case UserConstants.LOG_IN:

                UserStore.emitChange();

                break;

            case UserConstants.LOG_OUT:

                UserStore.emitChange();

                break;
        }

        return true;

    })

});

module.exports = UserStore;