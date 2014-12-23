var Dispatcher = require('../dispatcher/dispatcher.js');
var PassageConstants = require('../constants/PassageConstants');
var assign = require('object.assign');
var Parse = window.Parse;

PassageActions = {

    create: function(data) {

        var Passage = Parse.Object.extend("Passage");
        var passage = new Passage();
        passage.save(data).then(resp => {
            Dispatcher.handleViewAction({
                actionType: PassageConstants.CREATE,
                data: resp
            });
        })

    },

    getAll: function() {
        var Passage = Parse.Object.extend("Passage");
        var queryObject = new Parse.Query(Passage);

        queryObject.find().then(resp => {

            Dispatcher.handleViewAction({
                actionType: PassageConstants.GET_ALL,
                data: resp.map(item => {return item.attributes})
            })

        });
    }


};


module.exports = PassageActions;