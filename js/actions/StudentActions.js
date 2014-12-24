var Dispatcher = require('../dispatcher/dispatcher.js');
var StudentConstants = require('../constants/StudentConstants');
var assign = require('object.assign');
var Parse = window.Parse;

var StudentActions = {

    create: function(data) {

        var Student = Parse.Object.extend("Student");
        var student = new Student();

        data.teacher = Parse.User.current();

        student.save(data).then(resp => {
            Dispatcher.handleViewAction({
                actionType: StudentConstants.CREATE_STUDENT,
                data: assign(resp.attributes, {id: resp.id})
            });
        })

    },

    getAll: function() {
        var Student = Parse.Object.extend("Student");
        var queryObject = new Parse.Query(Student);

        //only equal to the current User
        queryObject.equalTo('teacher', Parse.User.current());

        queryObject.find().then(resp => {
            Dispatcher.handleViewAction({
                actionType: StudentConstants.GET_ALL_STUDENTS,
                data: resp.map(item => {return assign(item.attributes, {id: item.id})})
            })

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
        var Student = Parse.Object.extend("Student");
        var query = new Parse.Query(Student);

        query.get(id).then(function(student) {

            //data.teacher = Parse.User.current();
            student.save(data).then(function(resp) {

                Dispatcher.handleViewAction({
                    actionType: StudentConstants.UPDATE_STUDENT,
                    data: assign(resp.attributes, {id: resp.id})
                });

            })
        });

    },

    showEditForm: function(id) {
        Dispatcher.handleViewAction({
            actionType: StudentConstants.SHOW_STUDENT_EDIT_FORM,
            data: {id: id, view: StudentConstants.SHOW_STUDENT_EDIT_FORM}
        });
    }

};


module.exports = StudentActions;