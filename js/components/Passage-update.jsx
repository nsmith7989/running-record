var React = require('react');

module.exports = React.createClass({

    render: function() {
        var currentPassage = this.props.state.currentPassage;
        return (
            <div className="form-wrap container">
                <form onSubmit={this.props.handleUpdate.bind(null, currentPassage.id)}>
                    <h2>Update Passage</h2>
                    <p className="success">{this.props.state.success}</p>
                    <label>Title</label>
                    <input type="text" name="title" placeholder="Title" defaultValue={currentPassage.attributes.title} />
                    <label>Difficulty</label>
                    <input type="text" name="difficulty" placeholder="Difficulty" defaultValue={currentPassage.attributes.difficulty}/>
                    <label>Text</label>
                    <textarea name="content" placeholder="Content" defaultValue={currentPassage.attributes.content} />
                    <input type="submit" />
                </form>
                <button onClick={this.props.list}>View List</button>
            </div>
        )
    }
});