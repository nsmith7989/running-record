var Dispatcher = require('../dispatcher/dispatcher.js');
var StudentConstants = require('../constants/Constants').student;
var assign = require('object.assign');
var Parse = window.Parse;

var StudentActions = {

    create: function(data) {
        Dispatcher.handleViewAction({
            actionType: StudentConstants.CREATE_STUDENT,
            data: data
        });
    },

    list: function() {
        Dispatcher.handleViewAction({
            actionType: StudentConstants.LIST_STUDENTS
        })
    },

    showForm: function() {
        Dispatcher.handleViewAction({
            actionType: StudentConstants.SHOW_STUDENT_FORM
        })
    },

    readStudent: function(id) {
        Dispatcher.handleViewAction({
            actionType: StudentConstants.READ_STUDENT,
            data: {id: id, view: StudentConstants.READ_STUDENT}
        })
    },

    update: function(id, data) {
        Dispatcher.handleViewAction({
            actionType: StudentConstants.UPDATE_STUDENT,
            data: {id: id, data: data}
        });

    },

    showEditForm: function(id) {
        Dispatcher.handleViewAction({
            actionType: StudentConstants.SHOW_STUDENT_EDIT_FORM,
            data: {id: id, view: StudentConstants.SHOW_STUDENT_EDIT_FORM}
        });
    },

    setCurrent: function(id) {
        Dispatcher.handleViewAction({
           actionType: StudentConstants.SET_CURRENT_STUDENT,
            data: {id: id}
        });
    },

    changeView: function(view) {
        Dispatcher.handleViewAction({
            actionType: StudentConstants.CHANGE_STUDENT_VIEW,
            data: view
        })
    }

};


module.exports = StudentActions;