var Dispatcher = require('../dispatcher/dispatcher.js');
var Parse = window.Parse;
var assign = Object.assign || require('object.assign');
var _ = require('lodash');
var Router = require('../actions/RouteActions');
var recorder = require('../utils/recorder');

var TestConstants = require('../constants/Constants').test;
var createStore = require('../utils/storeUtils');

var StudentStore = require('../stores/StudentStore');
var PassageStore = require('../stores/PassageStore');

var TestModel = require('../models/models').Test;
var TestCollection = require('../models/models').Tests;

var _collection = new TestCollection();

var _success_message = '';
var _current = '';
var _view = 'selection';
var _fetched = false;

var testsByStudent = {};

var TestStore = assign({}, createStore(), {

    initalize: () => {
        _collection.fetch().then(TestStore.emitChange);
    },

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

        return _collection.filter(function(test) {
            return test.get('student').id === id;
        });

    },


    /**
     * Get the most recent test by student id
     * @param id
     */
    mostRecentTest: (id) => {

        var tests = TestStore.getTestsByStudentId(id);

        if(tests && tests.length) {
            return tests.reduce(function(previousValue, currentValue) {
                var previousDate = new Date(previousValue.createdAt);
                var currentDate = new Date(currentValue.createdAt);

                if(previousDate > currentDate) {
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
        var data = action.data;

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
                (function() {
                    var test = new TestModel();
                    var currentPassage = PassageStore.getCurrentPassage();
                    var currentStudent = StudentStore.getCurrentStudent();
                    test.save(assign(data.testData, {
                        passage: currentPassage,
                        student: currentStudent,
                        teacher: Parse.User.current()
                    })).then(function(resp) {
                        recorder.sendToServer(data.audioData, resp.id);
                        _collection.add(test);
                    })

                })();


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
