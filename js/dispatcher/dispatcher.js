var Dispatcher = require('flux').Dispatcher,
    RunningRecordDispatcher = new Dispatcher();


    RunningRecordDispatcher.handleViewAction = action => {
        RunningRecordDispatcher.dispatch({
            source: 'VIEW_ACTION',
            action: action
        });
    };



module.exports = RunningRecordDispatcher;