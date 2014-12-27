var Dispatcher = require('../dispatcher/dispatcher.js');
var RouteConstants = require('../constants/RouteConstants');
var Parse = window.Parse;

//window.onpopstate = () => {
//    //RouteActions.navigate(window.location.hash.replace('#', ''));
//};

var RouteActions = {

    navigate: function(route) {
        route = route || '';
        //navigate, update the dispather with the navigate payload

        //var stateObj = { route: route };
        //history.pushState(stateObj, route, route);

        //window.location.hash = route ? '#' + route : '';

        Dispatcher.handleViewAction({
            actionType: RouteConstants.NAVIGATE,
            data: route
        });

    },

    updateHash: function (route) {
        //window.location.hash = '#' + route;
    }



};


module.exports = RouteActions;