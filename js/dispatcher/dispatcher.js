var Dispatcher = require('flux').Dispatcher,
    RunningRecordDispatcher = new Dispatcher();


    RunningRecordDispatcher.handleViewAction = function(action) {
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action
        });
    };



module.exports = RunningRecordDispatcher;