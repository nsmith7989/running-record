var Dispatcher = require('../dispatcher/dispatcher.js');
var PassageConstants = require('../constants/Constants').passage;
var assign = require('object.assign');
var Parse = window.Parse;
var notify = require('../actions/NotificationActions.js').newNotification;

var Passage = Parse.Object.extend("Passage");


var PassageActions = {

    create: function(data) {

        var passage = new Passage();
        passage.save(data).then(resp => {
            Dispatcher.handleViewAction({
                actionType: PassageConstants.CREATE_PASSAGE,
                data: resp
            });
        }).catch(e => {

            notify('An error has occurred.');

        });

    },

    getAll: function() {

        var queryObject = new Parse.Query(Passage);

        queryObject
            .find()
            .then(resp => {

            Dispatcher.handleViewAction({
                actionType: PassageConstants.GET_ALL_PASSAGES,
                data: resp
            })

        });

    },

    list: function() {
        Dispatcher.handleViewAction({
            actionType: PassageConstants.LIST_PASSAGES
        })
    },

    showForm: function() {
        Dispatcher.handleViewAction({
            actionType: PassageConstants.SHOW_PASSAGE_FORM
        })
    },

    readPassage: function(id) {
        Dispatcher.handleViewAction({
            actionType: PassageConstants.READ_PASSAGE,
            data: {id: id, view: PassageConstants.READ_PASSAGE}
        })
    },

    update: function(id, data) {
        var query = new Parse.Query(Passage);

        query.get(id).then(function(passage) {
            passage.save(data).then(function(resp) {

                Dispatcher.handleViewAction({
                    actionType: PassageConstants.UPDATE_PASSAGE,
                    data: resp
                });

            })
        });

    },

    showEditForm: function(id) {
        Dispatcher.handleViewAction({
            actionType: PassageConstants.SHOW_PASSAGE_EDIT_FORM,
            data: {id: id, view: PassageConstants.SHOW_PASSAGE_EDIT_FORM}
        });
    },

    destroy: function(id) {
        var query = new Parse.Query(Passage);

        query.get(id).then(function(passage) {
            passage.destroy().then(function(resp) {
                Dispatcher.handleViewAction({
                    actionType: PassageConstants.DELETE_PASSAGE,
                    data: resp
                });
            });
        });
    },

    setCurrent: function(id) {
        Dispatcher.handleViewAction({
            actionType: PassageConstants.SET_CURRENT_PASSAGE,
            data: {id: id}
        });
    },

    getPassageById: function(id) {
        var queryObj = new Parse.Query(Passage);

        queryObj.get(id).then(function(passage) {
            Dispatcher.handleViewAction({
                ActionType: PassageConstants.GET_PASSAGE_BY_ID,
                data: {id: passage.id, passage: passage}
            })
        })
    },

    changeView: function(view) {
        Dispatcher.handleViewAction({
            actionType: PassageConstants.CHANGE_PASSAGE_VIEW,
            data: view
        })
    }


};


module.exports = PassageActions;