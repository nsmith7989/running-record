var React = require('react');

module.exports = React.createClass({

    render: function() {
        return (
            <div className="container top-padding">
                <h2>{this.props.state.currentPassage.title}</h2>
                <p><strong>Difficulty: {this.props.state.currentPassage.difficulty}</strong></p>
                <p dangerouslySetInnerHTML={{__html: this.props.state.currentPassage.content.replace(/\r?\n/g, '<br />')}} />
                <button onClick={this.props.list}>&larr; Back to Passages List</button>
                <button onClick={this.props.showEditForm.bind(null, this.props.state.currentPassage.id)}>Update</button>
            </div>
        )
    }
});