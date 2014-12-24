var React = require('react');

module.exports = React.createClass({

    render: function() {
        var currentStudent = this.props.state.currentStudent;
        return (
            <div className="container top-padding">
                <h2>{currentStudent.name}</h2>
                <p dangerouslySetInnerHTML={{ __html: currentStudent.notes }} />

                <div>
                    <button className="dangerous-action">Test {currentStudent.name}</button>
                </div>
                <button onClick={this.props.list}>&larr; Back to Student List</button>
                <button onClick={this.props.showEditForm.bind(null, currentStudent.id)}>Update {currentStudent.name}</button>



            </div>
        )
    }
});