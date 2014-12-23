var Dispatcher = require('../dispatcher/dispatcher.js');
var Parse = window.Parse;
var assign = Object.assign || require('object.assign');
var RouterConstants = require('../constants/RouteConstants');
var createStore = require('../utils/storeUtils');

var _errors = [];
var _currentPath;

var RouteStore = assign(createStore(), {

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