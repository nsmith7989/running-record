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
                actionType: StudentConstants.CREATE,
                data: assign(resp.attributes, {id: resp.id})
            });
        })

    },

    getAll: function() {
        var Student = Parse.Object.extend("Student");
        var queryObject = new Parse.Query(Student);

        queryObject.find().then(resp => {

            Dispatcher.handleViewAction({
                actionType: StudentConstants.GET_ALL,
                data: resp.map(item => {return assign(item.attributes, {id: item.id})})
            })

        });
    },

    list: function() {
        Dispatcher.handleViewAction({
            actionType: StudentConstants.LIST
        })
    },

    showForm: function() {
        Dispatcher.handleViewAction({
            actionType: StudentConstants.SHOW_FORM
        })
    },

    readStudent: function(id) {
        Dispatcher.handleViewAction({
            actionType: StudentConstants.READ,
            data: {id: id, view: StudentConstants.READ}
        })
    },

    update: function(id, data) {
        var Student = Parse.Object.extend("Student");
        var query = new Parse.Query(Student);

        query.get(id).then(function(student) {

            //data.teacher = Parse.User.current();
            student.save(data).then(function(resp) {

                Dispatcher.handleViewAction({
                    actionType: StudentConstants.UPDATE,
                    data: assign(resp.attributes, {id: resp.id})
                });

            })
        });

    },

    showEditForm: function(id) {
        Dispatcher.handleViewAction({
            actionType: StudentConstants.SHOW_EDIT_FORM,
            data: {id: id, view: StudentConstants.SHOW_EDIT_FORM}
        });
    }

};

//on first load get all students
StudentActions.getAll();


module.exports = StudentActions;