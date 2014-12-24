var React = require('react');
var jQuery = require('jquery');
var StudentActions = require('../actions/StudentActions');
var StudentStore = require('../stores/StudentStore');
var StudentConstants = require('../constants/StudentConstants');
var Form = require('./Students-form.jsx');
var List = require('./Students-list.jsx');
var Read = require('./Students-read.jsx');
var Update = require('./Students-update.jsx');

var getStudentInfo = () => {
    return {
        success: StudentStore.getStudentSuccessMessage(),
        view: StudentStore.getStudentCurrentView(),
        students: StudentStore.getStudents(),
        currentStudent: StudentStore.getCurrentStudent()
    }
};

module.exports = React.createClass({

    handleCreate: function(e) {
        e.preventDefault();

        var formData = {};
        jQuery(e.target).serializeArray()
            .map(item => {
                formData[item.name] = item.value;
            });
        StudentActions.create(formData);

    },

    handleUpdate: function(id, e) {
        e.preventDefault();
        var formData = {};
        jQuery(e.target).serializeArray()
            .map(item => {
                formData[item.name] = item.value;
            });
        StudentActions.update(id, formData);
    },

    getInitialState: function() {
        return getStudentInfo();
    },

    componentWillMount: function() {
        StudentStore.addChangeListener(this._onStudentChange);
    },

    componentWillUnmount: function() {
        StudentStore.removeChangeListener(this._onStudentChange);
    },

    list: function() {
        StudentActions.list();
    },

    showAddForm: function() {
        StudentActions.showForm();
    },

    read: function(id) {
        StudentActions.readStudent(id);
    },

    showEditForm: function(id) {
        StudentActions.showEditForm(id);
    },

    delete: function(id) {
    },


    render: function() {

        var output;
        switch(this.state.view) {
            case StudentConstants.LIST_STUDENTS:
                output = <List {...this} />;
                break;
            case StudentConstants.SHOW_STUDENT_FORM:
                output = <Form {...this} />;
                break;
            case StudentConstants.READ_STUDENT:
                output = <Read {...this} />;
                break;
            case StudentConstants.SHOW_STUDENT_EDIT_FORM:
                output = <Update {...this} />;
                break;
        }

        return output;

    },

    _onStudentChange: function() {
        this.setState(getStudentInfo());
    }

});