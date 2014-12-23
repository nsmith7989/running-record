var React = require('react');

module.exports = React.createClass({

    render: function() {
        return (
            <div className="form-wrap container">
                <form onSubmit={this.props.handleCreate}>
                    <h2>Add Passage</h2>
                    <p className="success">{this.props.state.success}</p>
                    <input type="text" name="title" placeholder="Title"/>
                    <input type="text" name="difficulty" placeholder="Difficulty"/>
                    <textarea name="content" placeholder="Content"/>
                    <input type="submit" />
                </form>
                <button onClick={this.props.list}>View List</button>
            </div>
        )
    }
});