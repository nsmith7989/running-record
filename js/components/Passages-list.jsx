var React = require('react');
var Fuse = require('fuse.js');
var PassageStore = require('../stores/PassageStore');

function getPassageInfo() {
    return {
        success: PassageStore.getSuccessMessage(),
        view: PassageStore.getCurrentView(),
        passages: PassageStore.getPassages(),
        currentPassage: PassageStore.getCurrentPassage()
    }
}

module.exports = React.createClass({

    getInitialState: function() {
        return getPassageInfo();
    },

    componentWillMount: function() {
        PassageStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        PassageStore.removeChangeListener(this._onChange);
    },


    search: function(e) {

        var searchString = e.target.value;

        //if there is no text value display all results
        if(!searchString) {

            this.setState(this.getInitialState());

            return;
        }
        var options = {
            caseSensitive: false,
            includeScore: false,
            shouldSort: true,
            threshold: 0.2,
            keys: ['title']
        };

        var fuse = new Fuse(this.props.passages, options);


        this.setState({
            passages: fuse.search(searchString)
        })
    },

    render: function() {
        var suscess = this.props.state.success ? <p className="success">{this.props.state.success}</p> : '';
        return (
            <div>
                <div className="container flash">
                    {suscess}
                </div>
                <div className="header-wrap">
                    <div className="container">
                        <header>Passages</header>
                        <div className="serach-wrap">
                            <input onChange={this.search} type="search" placeholder="Search...."/>
                        </div>
                        <div className="button-wrap">
                            <button className="add" onClick={this.props.showAddForm}>+ Passage</button>
                        </div>
                    </div>
                </div>
                <div className="table-list">
                    <ul>
                        <li className="headings">
                            <div className="container">
                                <span>Title</span>
                                <span>Difficulty</span>
                                <span>Actions</span>
                            </div>
                        </li>
                    {this.state.passages.map(function(passage, pos) {
                        return (
                            <li key={passage.id}>
                                <div className="container">
                                    <a onClick={this.props.read.bind(null, passage.id)}>{passage.title}</a>
                                    <span>{passage.difficulty}</span>
                                    <span className="actions">
                                        <button className="read" onClick={this.props.read.bind(null, passage.id)}>
                                            View
                                        </button>
                                        <button className="edit" onClick={this.props.showEditForm.bind(null, passage.id)}>
                                            Edit
                                        </button>
                                        <button className="delete" onClick={this.props.delete.bind(null, passage.id)}>
                                            Delete
                                        </button>
                                    </span>
                                </div>
                            </li>
                        )
                    }.bind(this))}
                    </ul>

                </div>

            </div>
        )
    },

    _onChange: function() {
        this.setState(getPassageInfo());
    }
});