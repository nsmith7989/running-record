let NotificationActions = require('../actions/NotificationActions.js');

module.exports = function(message) {

    NotificationActions.newNotification(message);

};