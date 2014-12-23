var React = require('react');

module.exports = React.createClass({

    render: function() {
        return (
            <div className="container top-padding">
                <h2>{this.props.state.currentPassage.title}</h2>
                <p>Difficulty: {this.props.state.currentPassage.difficulty}</p>
                <p>{this.props.state.currentPassage.content}</p>
                <button onClick={this.props.list}>&larr; Back to Passages List</button>
                <button onClick={this.props.showEditForm.bind(null, this.props.state.currentPassage.id)}>Update</button>
            </div>
        )
    }
});