'use strict';
var Parse = window.Parse;
var _ = require('underscore');

/**
 * update parse collection with backbone post 1.0 collection
 * get either by cid or id
 * @param obj
 * @returns {*}
 */
Parse.Collection.prototype.get = function(obj) {
    if (obj == null) return void 0;
    return this._byId[obj.id || obj] || this._byCid[obj.id || obj];
};

/**
 * update parse collection to have where
 * @param attrs
 * @returns {*}
 */
Parse.Collection.prototype.where = function(attrs) {
    return this.filter(function(model) {
        for (var key in attrs) {
            if (attrs[key] !== model.get(key)) return false;
        }
        return true;
    });
};

var Student = Parse.Object.extend('Student');
var Test = Parse.Object.extend('Test');
var Passage = Parse.Object.extend("Passage");
var User = Parse.User;

var Passages = Parse.Collection.extend({
    model: Passage
});

var Students = Parse.Collection.extend({
    model: Student,
    //only ever get students associated with the current user
    query: (new Parse.Query(Student).equalTo('teacher', Parse.User.current()))
});

var Tests = Parse.Collection.extend({
    model: Tests,
    //only ever get tests associated with the current user
    query: (new Parse.Query(Test).equalTo('teacher', Parse.User.current()))
});


module.exports = {
    //models
    Student: Student,
    Test: Test,
    Passage: Passage,
    User: User,

    //collections
    Passages: Passages,
    Students: Students,
    Tests: Tests
};
