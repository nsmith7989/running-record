var React = require('react');

module.exports = React.createClass({

    render: function() {
        var currentStudent = this.props.state.currentStudent;
        return (
            <div className="form-wrap container">
                <form onSubmit={this.props.handleUpdate.bind(null, currentStudent.id)}>
                    <h2>Update Student</h2>
                    <p className="success">{this.props.state.success}</p>
                    <label>Name</label>
                    <input type="text" name="title" placeholder="Name" defaultValue={currentStudent.attributes.name}/>
                    <label>Notes</label>
                    <textarea name="notes" placeholder="Notes" defaultValue={currentStudent.attributes.notes}/>
                    <input type="submit" />
                </form>
                <button onClick={this.props.list}>View List</button>
            </div>
        )
    }
});