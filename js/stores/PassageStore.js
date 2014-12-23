var Dispatcher = require('../dispatcher/dispatcher.js');
var Parse = window.Parse;
var assign = Object.assign || require('object.assign');
var _ = require('lodash');

var PassageConstants = require('../constants/PassageConstants');
var createStore = require('../utils/storeUtils');


var _passages = [];
var _success_message = '';
var _current = '';
var _view = PassageConstants.LIST;


var PassageStore = assign(createStore(), {

    getPassageSuccessMessage: function() {
        return _success_message;
    },

    getPassageCurrentView: function() {
        return _view;
    },

    getPassages: function() {
        return _passages;
    },

    getCurrentPassage: function() {
        return _current;
    },

    dispatcherIndex: Dispatcher.register(function(payload) {

        var action = payload.action;

        switch(action.actionType) {

            case PassageConstants.GET_ALL:

                _passages = action.data;
                PassageStore.emitChange();

                break;

            case PassageConstants.CREATE:

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

            case PassageConstants.LIST:

                _view = PassageConstants.LIST;
                PassageStore.emitChange();

                break;

            case PassageConstants.SHOW_FORM:

                _view = PassageConstants.SHOW_FORM;
                PassageStore.emitChange();

                break;

            case PassageConstants.READ:
                _view = PassageConstants.READ;

                _current = _.find(_passages, {id: action.data.id});

                PassageStore.emitChange();


                break;

            case PassageConstants.SHOW_EDIT_FORM:

                _view = PassageConstants.SHOW_EDIT_FORM;
                _current = _.find(_passages, {id: action.data.id});

                PassageStore.emitChange();

                break;

            case PassageConstants.UPDATE:

                _view = PassageConstants.LIST;
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

        }

        return true;

    })

});


module.exports = PassageStore;