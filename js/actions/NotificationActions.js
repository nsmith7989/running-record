let Dispatcher = require('../dispatcher/dispatcher.js');
let NotificationConstants = require('../constants/Constants').notification;

let NotificationActions = {

     newNotification(message) {
         Dispatcher.handleViewAction({
             actionType: NotificationConstants.NEW_NOTIFICATION,
             data: message
         });
     }

};


module.exports = NotificationActions;