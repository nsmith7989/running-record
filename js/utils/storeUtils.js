var assign = Object.assign || require('object.assign');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var CHANGE_EVENT = 'change';


function create() {

    var store = assign(EventEmitter.prototype, {
        emitChange: function() {
            this.emit(CHANGE_EVENT);
        },

        /**
         * @param {function} callback
         */
        addChangeListener: function(callback) {
            this.on(CHANGE_EVENT, callback);
        },

        /**
         * @param {function} callback
         */
        removeChangeListener: function(callback) {
            this.removeListener(CHANGE_EVENT, callback);
        }
    });


    //bind to itself
    _.each(store, function (val, key) {
        if (_.isFunction(val)) {
            store[key] = store[key].bind(store);
        }
    });

    return store;


}

module.exports = create;


