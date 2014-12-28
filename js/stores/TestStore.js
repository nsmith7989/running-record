var Dispatcher = require('../dispatcher/dispatcher.js');
var Parse = window.Parse;
var assign = Object.assign || require('object.assign');
var _ = require('lodash');
var Router = require('../actions/RouteActions');

var TestConstants = require('../constants/Constants').test;
var createStore = require('../utils/storeUtils');
var TestActions = require('../actions/TestActions');


var _success_message = '';
var _current = '';
var _view = 'selection';
var _score = {};
var _fetched = false;
var _initialized = false;

var testsByStudent = {};

var TestStore = assign({}, createStore(), {

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

        if (_fetched) {
            if(testsByStudent[id]) {
                return testsByStudent[id]
            } else {
                TestActions.findByStudent(id);
            }
        } else {
            TestActions.findByStudent(id);
        }
    },

    initalize: () => {
        if (!_initialized) {
            TestActions.getAll();
        }
    },

    /**
     *
     * @param id
     */
    mostRecentTest: (id) => {

        var tests = testsByStudent[id];
        if (tests && tests.length) {
            return tests.reduce(function(previousValue, currentValue) {
                var previousDate = new Date(previousValue.createdAt);
                var currentDate = new Date(currentValue.createdAt);

                if (previousDate > currentDate) {
                    return previousValue;
                } else {
                    return currentValue;
                }

            });

        } else {
            return false;
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
                _fetched = false;
                TestStore.emitChange();

                break;

            case TestConstants.TEST_FOR_STUDENT:

                testsByStudent[action.data.id] = action.data.tests;
                _fetched = true;
                TestStore.emitChange();

                break;

            case TestConstants.GET_ALL_TESTS:

                testsByStudent = _.groupBy(action.data, function(test) {return test.attributes.student.id });

                TestStore.emitChange();

                break;

            case TestConstants.SET_CURRENT_TEST:

                _current = action.data;
                TestStore.emitChange();

                break;
        }

    })

});

module.exports = TestStore;
