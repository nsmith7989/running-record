var React = require('react');
var RouteActions = require('../actions/RouteActions');


module.exports = React.createClass({

    goTo: function(route) {
        RouteActions.navigate(route);
    },


    render: function() {
        return (
            <div>
                <button onClick={this.goTo.bind(null, '/passages')}>Passages</button>
                <button onClick={this.goTo.bind(null, '/students')}>Students</button>
            </div>
        )
    }
});