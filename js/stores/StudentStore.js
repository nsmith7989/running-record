var Dispatcher = require('../dispatcher/dispatcher.js');
var Parse = window.Parse;
var assign = Object.assign || require('object.assign');
var _ = require('lodash');

var StudentConstants = require('../constants/StudentConstants');
var createStore = require('../utils/storeUtils');


var _students = [];
var _success_message = '';
var _current = '';
var _view = StudentConstants.SHOW_FORM;

var StudentStore = assign(createStore(), {

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

            case StudentConstants.GET_ALL:

                _students = action.data;
                StudentStore.emitChange();

                break;

            case StudentConstants.CREATE:

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

            case StudentConstants.LIST:

                _view = StudentConstants.LIST;
                StudentStore.emitChange();

                break;

            case StudentConstants.SHOW_FORM:

                _view = StudentConstants.SHOW_FORM;
                StudentStore.emitChange();

                break;

            case StudentConstants.READ:
                _view = StudentConstants.READ;

                _current = _.find(_students, {id: action.data.id});

                StudentStore.emitChange();


                break;

            case StudentConstants.SHOW_EDIT_FORM:

                _view = StudentStore.SHOW_EDIT_FORM;
                _current = _.find(_students, {id: action.data.id});

                StudentStore.emitChange();

                break;

            case StudentConstants.UPDATE:

                _view = StudentConstants.LIST;
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

        }

        return true;
    })

});


module.exports = StudentStore;