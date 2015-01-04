var Dispatcher = require('../dispatcher/dispatcher.js');
var Parse = window.Parse;
var assign = Object.assign || require('object.assign');
var _ = require('lodash');

var PassageConstants = require('../constants/Constants').passage;
var createStore = require('../utils/storeUtils');
var PassageActions = require('../actions/PassageActions');
var PassageCollection = require('../models/models').Passages;
var PassageModel = require('../models/models').Passage;

var _success_message = '';
var _current = '';
var _view = PassageConstants.LIST_PASSAGES;

var _passagesByID = {};
var _initialized = false;

var _collection = new PassageCollection();


var PassageStore = assign({}, createStore(), {

    initialize: function() {
        _collection.fetch().then(function() {
            // check whether the current user can edit, seat as attribute
            _collection.each(function(item) {
                if(item.get('user') && item.get('user').id == Parse.User.current().id) {
                    item.set({canEdit: true});
                }
            });
            PassageStore.emitChange();

        }, function(err) {
            console.error(err);
        });


        _initialized = true;
    },

    getPassageSuccessMessage: function() {
        return _success_message;
    },

    getPassageCurrentView: function() {
        return _view;
    },

    getPassages: function() {
        return _collection.models;
    },

    getCurrentPassage: function() {
        return _current;
    },

    getPassageById: function(id) {
        return _collection.get(id);
    },

    dispatcherIndex: Dispatcher.register(function(payload) {

        var action = payload.action;
        var data = action.data;

        switch(action.actionType) {

            case PassageConstants.CHANGE_PASSAGE_VIEW:

                _view = action.data;
                PassageStore.emitChange();

                break;

            case PassageConstants.CREATE_PASSAGE:


                (function() {
                    var __passage = new PassageModel(assign(action.data, {user: Parse.User.current()}));

                    __passage.save().then(function(resp) {

                        _collection.add(resp);
                        __passage.set({canEdit: true});

                        _success_message = 'Passage "' + action.data.title + '" Created!';
                        _view = PassageConstants.LIST_PASSAGES;

                        PassageStore.emitChange();

                        //hide flash
                        setTimeout(() => {
                            _success_message = '';
                            PassageStore.emitChange();
                        }, 4000);

                    });

                })();

                break;

            case PassageConstants.LIST_PASSAGES:

                _view = PassageConstants.LIST_PASSAGES;
                PassageStore.emitChange();

                break;

            case PassageConstants.SHOW_PASSAGE_FORM:

                _view = PassageConstants.SHOW_PASSAGE_FORM;
                PassageStore.emitChange();

                break;

            case PassageConstants.READ_PASSAGE:
                _view = PassageConstants.READ_PASSAGE;

                _current = _collection.get(action.data.id);

                PassageStore.emitChange();

                break;

            case PassageConstants.SHOW_PASSAGE_EDIT_FORM:

                _view = PassageConstants.SHOW_PASSAGE_EDIT_FORM;
                _current = _collection.get(action.data.id);

                PassageStore.emitChange();

                break;

            case PassageConstants.UPDATE_PASSAGE:

                _view = PassageConstants.LIST_PASSAGES;
                _current = null;

                var title = _collection.get(action.data.id).set(action.data.data).get('title');

                _success_message = 'Passage "' + title + '" updated';

                PassageStore.emitChange();

                setTimeout(() => {
                    _success_message = '';
                    PassageStore.emitChange();
                }, 4000);

                break;

            case PassageConstants.DELETE_PASSAGE:

                if(!data) {
                    console.error();
                }

                _collection.get(data).destroy();
                PassageStore.emitChange();

                setTimeout(() => {
                    _success_message = '';
                    PassageStore.emitChange();
                }, 4000);


                break;

            case PassageConstants.SET_CURRENT_PASSAGE:

                _current = _collection.get(action.data.id);
                PassageStore.emitChange();

                break;

            case PassageConstants.GET_PASSAGE_BY_ID:

                _passagesByID[action.data.id] = action.data.attributes.passage;

                PassageStore.emitChange();

                break;

        }

        return true;

    })

});


module.exports = PassageStore;