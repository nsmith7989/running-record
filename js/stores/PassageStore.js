var Dispatcher = require('../dispatcher/dispatcher.js');
var Parse = window.Parse;
var assign = Object.assign || require('object.assign');

var EventEmitter = require('events').EventEmitter;
var PassageConstants = require('../constants/PassageConstants');
var PassageActions = require('../actions/PassageActions');
var clearFlash = require('../utils/clearFlash');

var CHANGE_EVENT = 'change';

var _passages = [];
var _success_message = '';


var PassageStore = assign(EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        PassageStore.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        PassageStore.removeListener(CHANGE_EVENT, callback);
    },

    getSuccessMessage: function() {
        return _success_message;
    },

    dispatcherIndex: Dispatcher.register(function(payload) {

        var action = payload.action;

        switch(action.actionType) {

            case PassageConstants.GET_ALL:

                _passages.push(action.data);

                //PassageStore.emitChange();

                break;

            case PassageConstants.CREATE:

                _success_message = 'Passage "' + action.data.attributes.title + '" Created!';
                PassageStore.emitChange();

                //hide flash
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