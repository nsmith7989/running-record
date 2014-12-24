var Dispatcher = require('../dispatcher/dispatcher.js');
var TestConstants = require('../constants/TestConstants');
var assign = require('object.assign');
var Parse = window.Parse;

var Test = Parse.Object.extend('Test');
var Student = Parse.Object.extend('Student');
var Passage = Parse.Object.extend('Passage');


var TestActions = {

    create: (data, studentId, passageId) => {


        var test = new Test();
        data.teacher = Parse.User.current();
        var queryObj = new Parse.Query(Student);
        var passageQuery = new Parse.Query(Passage);

        passageQuery.get(passageId)
            .then(passage => {
                queryObj.get(studentId)
                    .then(student => {
                        return student
                    })
                    .then(student => {
                        data.student = student;
                        data.passage = passage;
                        return test.save(data);
                    })
                    .then(resp => {
                        Dispatcher.handleViewAction({
                            actionType: TestConstants.CREATE_TEST,
                            data: assign(resp.attributes, {id: resp.id})
                        })
                    });
            });

    },

    update: (id, data) => {
        var queryObj = new Parse.Query(Test);
        queryObj.get(id).then(test => {
            test.save(data).then(resp => {
                Dispatcher.handleViewAction({
                    actionType: TestConstants.UPDATE_TEST,
                    data: assign(resp.attributes, {id: resp.id})
                });
            });
        });
    },

    destroy: id => {
        var queryObj = new Parse.Query(Test);
        queryObj.get(id).then(test => {
            test.destroy().then(resp => {
                Dispatcher.handleViewAction({
                    actionType: TestConstants.DELETE_TEST,
                    data: assign(resp.attributes, {id: resp.id})
                });
            });
        });
    },

    switchView: view => {
        Dispatcher.handleViewAction({
            actionType: TestConstants.TEST_VIEW_CHANGE,
            data: view
        })
    },

    findByStudent: studentId => {
        var studentQuery = new Parse.Query(Student);

        studentQuery.find(studentId).then(student => {
           var testQuery = new Parse.Query(Test);
            testQuery.equalTo('student', student);
            testQuery.find(tests => {
                Dispatcher.handleViewAction({
                    actionType: TestConstants.TEST_FOR_STUDENT,
                    data: {
                        id: studentId,
                        tests: tests
                    }
                })
            });
        });
    }


};


module.exports = TestActions;