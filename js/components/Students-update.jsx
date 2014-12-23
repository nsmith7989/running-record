var React = require('react');

module.exports = React.createClass({

    render: function() {
        return (
            <div className="form-wrap container">
                <form onSubmit={this.props.handleCreate}>
                    <h2>Update Student</h2>
                    <input type="text" name="title" placeholder="Name"/>
                    <textarea name="content" placeholder="Notes"/>
                    <input type="submit" />
                </form>
                <button onClick={this.props.list}>View List</button>
            </div>
        )
    }
});