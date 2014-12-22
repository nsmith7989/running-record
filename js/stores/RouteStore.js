var Dispatcher = require('../dispatcher/dispatcher.js');
var Parse = window.Parse;
var assign = Object.assign || require('object.assign');

var EventEmitter = require('events').EventEmitter;
var RouterConstants = require('../constants/RouteConstants');

var CHANGE_EVENT = 'change';
var _errors = [];
var _success = [];
var _currentPath;

var RouteStore = assign(EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        RouteStore.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        RouteStore.removeListener(CHANGE_EVENT, callback);
    },

    getCurrentPath: function() {
        return _currentPath;
    },


    getError: function() {
        return _errors;
    },

    dispatcherIndex: Dispatcher.register(function(payload) {

        var action = payload.action;

        switch(action.actionType) {

            case RouterConstants.NAVIGATE:
                _currentPath = action.data;

                RouteStore.emitChange();

                break;

        }

        return true;

    })

});

module.exports = RouteStore;