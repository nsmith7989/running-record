var Dispatcher = require('../dispatcher/dispatcher.js');
var PassageConstants = require('../constants/PassageConstants');
var assign = require('object.assign');
var Parse = window.Parse;

PassageActions = {

    create: function(data) {

        var Passage = Parse.Object.extend("Passage");
        var passage = new Passage();
        passage.save(data).then(resp => {
            Dispatcher.handleViewAction({
                actionType: PassageConstants.CREATE,
                data: assign(resp.attributes, {id: resp.id})
            });
        })

    },

    getAll: function() {
        var Passage = Parse.Object.extend("Passage");
        var queryObject = new Parse.Query(Passage);

        queryObject.find().then(resp => {

            Dispatcher.handleViewAction({
                actionType: PassageConstants.GET_ALL,
                data: resp.map(item => {return assign(item.attributes, {id: item.id})})
            })

        });
    },

    list: function() {
        Dispatcher.handleViewAction({
            actionType: PassageConstants.LIST
        })
    },

    showForm: function() {
        Dispatcher.handleViewAction({
            actionType: PassageConstants.SHOW_FORM
        })
    },

    readPassage: function(id) {
        Dispatcher.handleViewAction({
            actionType: PassageConstants.READ,
            data: {id: id, view: PassageConstants.READ}
        })
    },

    update: function(id, data) {
        var Passage = Parse.Object.extend("Passage");
        var query = new Parse.Query(Passage);

        query.get(id).then(function(passage) {
            passage.save(data).then(function(resp) {

                Dispatcher.handleViewAction({
                    actionType: PassageConstants.UPDATE,
                    data: assign(resp.attributes, {id: resp.id})
                });

            })
        });

    },

    showEditForm: function(id) {
        Dispatcher.handleViewAction({
            actionType: PassageConstants.SHOW_EDIT_FORM,
            data: {id: id, view: PassageConstants.SHOW_EDIT_FORM}
        });
    }

};

//on first load get all passages
PassageActions.getAll();


module.exports = PassageActions;