let Dispatcher = require('../dispatcher/dispatcher.js');
let Parse = window.Parse;
let assign = Object.assign || require('object.assign');
let createStore = require('../utils/storeUtils');
let NotificationConstants = require('../constants/Constants.js').notification;

let _notification;


let NotificationStore = assign({}, createStore(), {

    get() {
        return _notification
    },

    dispatcherIndex: Dispatcher.register(function(payload) {
        let action = payload.action;

        switch(action.actionType) {

            case NotificationConstants.NEW_NOTIFICATION:

                _notification = action.data;

                setTimeout(function() {
                    _notification = "";
                    NotificationStore.emitChange();
                }, 5000);

                NotificationStore.emitChange();
                break;

        }

    })

});

module.exports = NotificationStore;