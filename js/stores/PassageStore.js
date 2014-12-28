var Dispatcher = require('../dispatcher/dispatcher.js');
var Parse = window.Parse;
var assign = Object.assign || require('object.assign');
var _ = require('lodash');

var PassageConstants = require('../constants/Constants').passage;
var createStore = require('../utils/storeUtils');
var PassageActions = require('../actions/PassageActions');
var RouterStore = require('./RouteStore');


var _passages = [];
var _success_message = '';
var _current = '';
var _view = PassageConstants.LIST_PASSAGES;
var _passagesByID = {};
var _initalized = false;


var PassageStore = assign({}, createStore(), {

    initialize: function() {
        //on first load get all passages
        PassageActions.getAll();
        _initalized = true;
    },

    getPassageSuccessMessage: function() {
        return _success_message;
    },

    getPassageCurrentView: function() {
        return _view;
    },

    getPassages: function() {
        if (_initalized) {
            return _passages;
        } else {
            PassageStore.initialize();
        }

    },

    getCurrentPassage: function() {
        return _current;
    },

    getPassageById: function(id) {
        if (!_passagesByID[id]) {
            PassageActions.getPassageById(id);
        } else {
            return _passagesByID[id];
        }

    },



    dispatcherIndex: Dispatcher.register(function(payload) {

        var action = payload.action;

        switch(action.actionType) {

            case PassageConstants.CHANGE_PASSAGE_VIEW:

                _view = action.data;
                PassageStore.emitChange();

                break;

            case PassageConstants.GET_ALL_PASSAGES:

                _passages = action.data;
                PassageStore.emitChange();

                break;

            case PassageConstants.CREATE_PASSAGE:

                _success_message = 'Passage "' + action.data.title + '" Created!';

                //add passage
                _passages.push(action.data);


                PassageStore.emitChange();

                //hide flash
                setTimeout(() => {
                    _success_message = '';
                    PassageStore.emitChange();
                }, 4000);

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

                _current = _.find(_passages, {id: action.data.id});

                PassageStore.emitChange();


                break;

            case PassageConstants.SHOW_PASSAGE_EDIT_FORM:

                _view = PassageConstants.SHOW_PASSAGE_EDIT_FORM;
                _current = _.find(_passages, {id: action.data.id});

                PassageStore.emitChange();

                break;

            case PassageConstants.UPDATE_PASSAGE:

                _view = PassageConstants.LIST_PASSAGES;
                _current = null;

                //find the passage and update its data
                var passage = _.find(_passages, {id: action.data.id});

                var newPassage = action.data;

                _passages[_passages.indexOf(passage)] = newPassage;

                _success_message = 'Passage "' + action.data.title + '" updated';

                PassageStore.emitChange();

                setTimeout(() => {
                    _success_message = '';
                    PassageStore.emitChange();
                }, 4000);


                break;

            case PassageConstants.DELETE_PASSAGE:

                var passage = _.find(_passages, {id: action.data.id});

                _passages.splice(_passages.indexOf(passage), 1);

                _success_message = 'Passage "' + action.data.title + '" deleted';

                PassageStore.emitChange();

                setTimeout(() => {
                    _success_message = '';
                    PassageStore.emitChange();
                }, 4000);


                break;

            case PassageConstants.SET_CURRENT_PASSAGE:

                _current = _.find(_passages, {id: action.data.id});

                break;

            case PassageConstants.GET_PASSAGE_BY_ID:

                _passagesByID[action.data.id] = action.data.passage;

                PassageStore.emitChange();

                break;

        }

        return true;

    })

});


module.exports = PassageStore;