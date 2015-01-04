var Dispatcher = require('../dispatcher/dispatcher.js');
var Parse = window.Parse;
var assign = Object.assign || require('object.assign');
var _ = require('lodash');

var StudentConstants = require('../constants/Constants').student;
var createStore = require('../utils/storeUtils');
var StudentModel = require('../models/models').Student;
var StudentCollection = require('../models/models').Students;

var _collection = new StudentCollection();

var _success_message = '';
var _current;
var _view = StudentConstants.LIST_STUDENTS;

var StudentStore = assign({}, createStore(), {

    initialize: function() {
        //on first load get all students
        _collection.fetch().then(function() {
            StudentStore.emitChange();
        }, function(err) {
            throw err;
        });
    },

    getStudentSuccessMessage: function() {
        return _success_message;
    },

    getStudentCurrentView: function() {
        return _view;
    },

    getStudents: function() {
        return _collection;
    },

    getCurrentStudent: function() {
        return _current;
    },

    dispatcherIndex: Dispatcher.register(function(payload) {

        var action = payload.action;

        switch(action.actionType) {

            case StudentConstants.CREATE_STUDENT:

                (function() {
                    var student = new StudentModel(assign(action.data, {teacher: Parse.User.current()}));
                    student.save().then(function(resp) {
                        _view = StudentConstants.LIST_STUDENTS;

                        _success_message = 'Student "' + student.get('name') + '" Created!';
                        _collection.add(student);

                        StudentStore.emitChange();

                        //hide flash
                        setTimeout(() => {
                            _success_message = '';
                            StudentStore.emitChange();
                        }, 4000);

                    });


                })();

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
                _current = _collection.get(action.data.id);

                StudentStore.emitChange();

                break;

            case StudentConstants.SHOW_STUDENT_EDIT_FORM:

                _view = StudentConstants.SHOW_STUDENT_EDIT_FORM;
                _current = _collection.get(action.data.id);

                StudentStore.emitChange();

                break;

            case StudentConstants.UPDATE_STUDENT:

                _view = StudentConstants.LIST_STUDENTS;
                _current = null;

                (function() {
                    var student = _collection.get(action.data.id).set(action.data.data);
                    student.save();
                    _success_message = 'Student "' + student.get('name') + '" updated';

                    StudentStore.emitChange();

                    setTimeout(() => {
                        _success_message = '';
                        StudentStore.emitChange();
                    }, 4000);

                })();

                break;

            case StudentConstants.SET_CURRENT_STUDENT:

                _current = _collection.get(action.data.id);

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