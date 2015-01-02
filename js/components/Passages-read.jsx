var React = require('react');

var Buttons = React.createClass({
    render: function() {
        return (
            <div>
                <button onClick={this.props.list}>&larr; Back to Passages List</button>
                <button onClick={this.props.showEditForm.bind(null, this.props.state.currentPassage.id)}>Update</button>
            </div>
        );
    }
});

var SelectionButton = React.createClass({
    render: function() {
        return (
            <div>
                <button onClick={this.props.backToList}>&larr; Back to Passages</button>
                <button onClick={this.props.selectText.bind(null, this.props.id)}>Select</button>
            </div>
        )
    }
});

module.exports = React.createClass({

    render: function() {

        var buttons = this.props.selectionButton || false;
        return (
            <div className="container top-padding">
                <h2>{this.props.state.currentPassage.get('title')}</h2>
                <p>
                    <strong>Difficulty: {this.props.state.currentPassage.get('difficulty')}</strong>
                </p>
                <p dangerouslySetInnerHTML={{__html: this.props.state.currentPassage.get('content').replace(/\r?\n/g, '<br />')}} />
                {buttons ? <SelectionButton id={this.props.state.currentPassage.id} {...this.props} /> : <Buttons {...this.props} />}
            </div>
        )
    }
});