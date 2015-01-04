var Dispatcher = require('../dispatcher/dispatcher.js');
var PassageConstants = require('../constants/Constants').passage;
var assign = require('object.assign');
var Parse = window.Parse;

var Passage = Parse.Object.extend("Passage");


PassageActions = {

    create: function(data) {

        Dispatcher.handleViewAction({
            actionType: PassageConstants.CREATE_PASSAGE,
            data: data
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

        Dispatcher.handleViewAction({
            actionType: PassageConstants.UPDATE_PASSAGE,
            data: {id: id, data: data}
        });

        //var query = new Parse.Query(Passage);
        //query.get(id).then(function(passage) {
        //    passage.save(data).then(function(resp) {
        //
        //        Dispatcher.handleViewAction({
        //            actionType: PassageConstants.UPDATE_PASSAGE,
        //            data: resp
        //        });
        //
        //    })
        //});

    },

    showEditForm: function(id) {
        Dispatcher.handleViewAction({
            actionType: PassageConstants.SHOW_PASSAGE_EDIT_FORM,
            data: {id: id, view: PassageConstants.SHOW_PASSAGE_EDIT_FORM}
        });
    },

    destroy: function(id) {

        Dispatcher.handleViewAction({
            actionType: PassageConstants.DELETE_PASSAGE,
            data: id
        });

    },

    setCurrent: function(id) {
        Dispatcher.handleViewAction({
            actionType: PassageConstants.SET_CURRENT_PASSAGE,
            data: {id: id}
        });
    },

    changeView: function(view) {
        Dispatcher.handleViewAction({
            actionType: PassageConstants.CHANGE_PASSAGE_VIEW,
            data: view
        })
    }


};


module.exports = PassageActions;