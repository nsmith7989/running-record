var Dispatcher = require('../dispatcher/dispatcher.js');
var TestConstants = require('../constants/Constants').test;
var assign = require('object.assign');
var Parse = window.Parse;
var recorder = require('../utils/recorder');

var Test = Parse.Object.extend('Test');
var Student = Parse.Object.extend('Student');
var Passage = Parse.Object.extend('Passage');


var TestActions = {

    create: (data, audioData) => {

        Dispatcher.handleViewAction({
            actionType: TestConstants.CREATE_TEST,
            data: {
                testData: data,
                audioData: audioData
            }
        });

    },


    switchView: view => {
        Dispatcher.handleViewAction({
            actionType: TestConstants.TEST_VIEW_CHANGE,
            data: view
        })
    },


    setCurrentTest: test => {
        Dispatcher.handleViewAction({
           actionType: TestConstants.SET_CURRENT_TEST,
            data: test
        });
    }

};


module.exports = TestActions;