var Dispatcher = require('../dispatcher/dispatcher.js');
var Parse = window.Parse;
var assign = Object.assign || require('object.assign');
var _ = require('lodash');
var Router = require('../actions/RouteActions');

var TestConstants = require('../constants/TestConstants');
var createStore = require('../utils/storeUtils');
var TestActions = require('../actions/TestActions');



var _success_message = '';
var _current = '';
var _view = 'selection';
var _score = {};

var testsByStudent = {};

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

    getTestsByStudentId: (id) => {
        if (!testsByStudent[id]) {
            TestActions.findByStudent(id);
        } else {
            return testsByStudent[id];
        }
    },

    dispatcherIndex: Dispatcher.register(payload => {
        var action = payload.action;

        switch(action.actionType) {
            case TestConstants.PASSAGE_SELECTION:

                _view = 'selection';
                TestStore.emitChange();

                break;
            case TestConstants.TEST_VIEW_CHANGE:

                _view = action.data;
                TestStore.emitChange();

                break;
            case TestConstants.CREATE_TEST:

                _view = 'selection';
                debugger;
                testsByStudent[action.data.studentId].tests.push(action.data);

                TestStore.emitChange();

                break;

            case TestConstants.TEST_FOR_STUDENT:

                testsByStudent[action.data.id] = action.data.tests;
                TestStore.emitChange();

                break;
        }

    })

});

module.exports = TestStore;
