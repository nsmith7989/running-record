var React = require('react');
var jQuery = require('jquery');
var PassageActions = require('../actions/PassageActions');
var PassageStore = require('../stores/PassageStore');
var PassageConstants = require('../constants/PassageConstants');
var Form = require('./Passages-form.jsx');
var List = require('./Passages-list.jsx');
var Read = require('./Passages-read.jsx');
var Update = require('./Passage-update.jsx');

var getPassageInfo = () => {
    return {
        success: PassageStore.getPassageSuccessMessage(),
        view: PassageStore.getPassageCurrentView(),
        passages: PassageStore.getPassages(),
        currentPassage: PassageStore.getCurrentPassage()
    }
};

var PassagesController = React.createClass({

    handleCreate: function(e) {
        e.preventDefault();

        var formData = {};
        jQuery(e.target).serializeArray()
            .map(item => {
                formData[item.name] = item.value;
            });
        PassageActions.create(formData);

    },

    handleUpdate: function(id, e) {
        e.preventDefault();
        var formData = {};
        jQuery(e.target).serializeArray()
            .map(item => {
                formData[item.name] = item.value;
            });
        PassageActions.update(id, formData);
    },

    getInitialState: function() {
        return getPassageInfo();
    },

    componentWillMount: function() {
        PassageStore.addChangeListener(this._onPassageChange);
    },

    componentWillUnmount: function() {
        PassageStore.removeChangeListener(this._onPassageChange);
    },

    list: function() {
        PassageActions.list();
    },

    showAddForm: function() {
        PassageActions.showForm();
    },

    read: function(id) {
        PassageActions.readPassage(id);
    },

    showEditForm: function(id) {
        PassageActions.showEditForm(id);
    },

    destroy: function(id) {
        PassageActions.destroy(id);
    },

    render: function() {

        var output;
        switch(this.state.view) {
            case PassageConstants.LIST_PASSAGES:
                output = <List {...this} />;
                break;
            case PassageConstants.SHOW_PASSAGE_FORM:
                output = <Form {...this} />;
                break;
            case PassageConstants.READ_PASSAGE:
                output = <Read {...this} />;
                break;
            case PassageConstants.SHOW_PASSAGE_EDIT_FORM:
                output = <Update {...this} />;
                break;
        }

        return output;
    },

    _onPassageChange: function() {
        this.setState(getPassageInfo());
    }
});

module.exports = PassagesController;