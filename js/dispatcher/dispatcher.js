var Dispatcher = require('flux').Dispatcher,
    assign = require('object-assign'),
    RunningRecordDispatcher = new Dispatcher();


    RunningRecordDispatcher.handleViewAction = function(action) {
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action
        });
    };



module.exports = RunningRecordDispatcher;