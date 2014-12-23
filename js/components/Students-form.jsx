var React = require('react');

module.exports = React.createClass({

    render: function() {
        return (
            <div className="form-wrap container">
                <form onSubmit={this.props.handleCreate}>
                    <h2>Add Student</h2>
                    <input type="text" name="name" placeholder="Name"/>
                    <textarea name="notes" placeholder="Notes"/>
                    <input type="submit" />
                </form>
                <button onClick={this.props.list}>View List</button>
            </div>
        )
    }
});