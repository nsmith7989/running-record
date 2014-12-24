var Dispatcher = require('../dispatcher/dispatcher.js');
var Parse = window.Parse;
var assign = Object.assign || require('object.assign');
var _ = require('lodash');

var TestConstants = require('../constants/TestConstants');
var createStore = require('../utils/storeUtils');
var TestActions = require('../actions/TestActions');


var _success_message = '';
var _current = '';
var _view = TestConstants.PASSAGE_SELECTION;
var _score = {};

var TestStore = assign(createStore(), {

    getTestSuccessMessage: () => {
        return _success_message;
    },

    getTestCurrentView: () => {
        return _view;
    },

    getCurrentTest: () => {
        return _current;
    },

    dispatcherIndex: Dispatcher.register(payload => {
        var action = payload.action;

        switch(action.actionType) {
            case TestConstants.PASSAGE_SELECTION:

                _view = TestConstants.PASSAGE_SELECTION;
                TestStore.emitChange();

                break;
        }

    })

});

module.exports = TestStore;
