var Dispatcher = require('../dispatcher/dispatcher.js');
var Parse = window.Parse;
var assign = Object.assign || require('object.assign');
var _ = require('lodash');

var StudentConstants = require('../constants/StudentConstants');
var createStore = require('../utils/storeUtils');
var StudentActions = require('../actions/StudentActions');


var _students = [];
var _success_message = '';
var _current = '';
var _view = StudentConstants.LIST_STUDENTS;

var StudentStore = assign(createStore(), {

    initialize: function() {
        //on first load get all students
        StudentActions.getAll();
    },

    getStudentSuccessMessage: function() {
        return _success_message;
    },

    getStudentCurrentView: function() {
        return _view;
    },

    getStudents: function() {
        return _students;
    },

    getCurrentStudent: function() {
        return _current;
    },

    dispatcherIndex: Dispatcher.register(function(payload) {

        var action = payload.action;

        switch(action.actionType) {

            case StudentConstants.GET_ALL_STUDENTS:

                _students = action.data;
                StudentStore.emitChange();

                break;

            case StudentConstants.CREATE_STUDENT:

                _success_message = 'Student "' + action.data.name + '" Created!';

                //add student
                _students.push(action.data);


                StudentStore.emitChange();

                //hide flash
                setTimeout(() => {
                    _success_message = '';
                    StudentStore.emitChange();
                }, 4000);

                break;

            case StudentConstants.LIST_STUDENTS:

                _view = StudentConstants.LIST_STUDENTS;
                StudentStore.emitChange();

                break;

            case StudentConstants.SHOW_STUDENT_FORM:

                _view = StudentConstants.SHOW_STUDENT_FORM;
                StudentStore.emitChange();

                break;

            case StudentConstants.READ_STUDENT:
                _view = StudentConstants.READ_STUDENT;

                _current = _.find(_students, {id: action.data.id});

                StudentStore.emitChange();


                break;

            case StudentConstants.SHOW_STUDENT_EDIT_FORM:



                _view = StudentConstants.SHOW_STUDENT_EDIT_FORM;
                _current = _.find(_students, {id: action.data.id});

                StudentStore.emitChange();

                break;

            case StudentConstants.UPDATE_STUDENT:

                _view = StudentConstants.LIST_STUDENTS;
                _current = null;

                //find the student and update its data
                var student = _.find(_students, {id: action.data.id});

                var newStudent = action.data;

                _students[_students.indexOf(student)] = newStudent;

                _success_message = 'Student "' + action.data.name + '" updated';

                StudentStore.emitChange();

                setTimeout(() => {
                    _success_message = '';
                    StudentStore.emitChange();
                }, 4000);


                break;
            case StudentConstants.SET_CURRENT_STUDENT:

                _current = _.find(_students, {id: action.data.id});

                break;

            case StudentConstants.CHANGE_STUDENT_VIEW:


                _view = action.data;
                StudentStore.emitChange();
                break;

        }

        return true;
    })

});


module.exports = StudentStore;