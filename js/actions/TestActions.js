var Dispatcher = require('../dispatcher/dispatcher.js');
var TestConstants = require('../constants/TestConstants');
var assign = require('object.assign');
var Parse = window.Parse;

var Test = Parse.Object.extend('Test');
var Student = Parse.Object.extend('Student');


var TestActions = {

    create: (data, studentId) => {

        var test = new Test();
        data.teacher = Parse.User.current();
        var queryObj = new Parse.Query(Student);

        //todo attach passage

        queryObj.get(studentId)
            .then(student => {
                return student
            })
            .then(student => {
                data.student = student;
                return test.save(data);
            })
            .then(resp => {
                Dispatcher.handleViewAction({
                    actionType: TestConstants.CREATE_TEST,
                    data: assign(resp.attributes, {id: resp.id})
                })
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
                })
            });
        });
    }


};


module.exports = TestActions;