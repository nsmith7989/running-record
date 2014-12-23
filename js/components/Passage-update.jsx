var React = require('react');

module.exports = React.createClass({

    render: function() {
        return (
            <div className="form-wrap container">
                <form onSubmit={this.props.handleUpdate.bind(null, this.props.state.currentPassage.id)}>
                    <h2>Update Passage</h2>
                    <p className="success">{this.props.state.success}</p>
                    <label>Title</label>
                    <input type="text" name="title" placeholder="Title" defaultValue={this.props.state.currentPassage.title} />
                    <label>Difficulty</label>
                    <input type="text" name="difficulty" placeholder="Difficulty" defaultValue={this.props.state.currentPassage.difficulty}/>
                    <label>Text</label>
                    <textarea name="content" placeholder="Content" defaultValue={this.props.state.currentPassage.content} />
                    <input type="submit" />
                </form>
                <button onClick={this.props.list}>View List</button>
            </div>
        )
    }
});