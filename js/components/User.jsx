var Header = require('./Header.jsx');
var Footer = require('./Footer.jsx');
var UserStore = require('../stores/UserStore');


var React = require('react');

var User = React.createClass({

    componentDidMount: function() {
        UserStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        UserStore.removeChangeListener(this._onChange);
    },

});