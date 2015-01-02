var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var Fuse = require('fuse.js');
var PassageStore = require('../stores/PassageStore');

function getPassageInfo() {
    return {
        success: PassageStore.getPassageSuccessMessage(),
        view: PassageStore.getPassageCurrentView(),
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

    confirmDeletion: function(id) {

        this.setState({
            deletionConfirmation: true,
            possibleDeletion: id
        })
    },

    confirmYes: function(id) {

        this.props.destroy(id);
        this.replaceState(getPassageInfo());
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
            keys: ['attributes.title', 'attributes.difficulty']
        };

        var fuse = new Fuse(this.state.passages, options);


        this.setState({
            passages: fuse.search(searchString)
        })
    },

    render: function() {

        var confirm = (
            <div className="confirm">
                <div className="container">
                    This will remove this passage for all users:
                    <button onClick={this.confirmYes.bind(null, this.state.possibleDeletion)}>Confirm</button>
                </div>
            </div>
        );

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
                {this.state.deletionConfirmation ? confirm : ''}
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

                        var disabled = !passage.get('canEdit');

                        var editControls = (
                            <span className="actions">
                                <button className="read" onClick={this.props.read.bind(null, passage.id)}>
                                    View
                                </button>
                                <button disabled={disabled} className="edit" onClick={this.props.showEditForm.bind(null, passage.id)}>
                                    Edit
                                </button>
                                <button disabled={disabled} className="delete" onClick={this.confirmDeletion.bind(null, passage.cid)}>
                                    Delete
                                </button>
                            </span>
                        );


                        return (
                            <ReactCSSTransitionGroup transitionName="example">
                                <li key={passage.id}>
                                    <div className="container">
                                        <a onClick={this.props.read.bind(null, passage.id)}>{passage.get('title')}</a>
                                        <span>{passage.get('difficulty')}</span>
                                     {editControls}
                                    </div>
                                </li>
                            </ReactCSSTransitionGroup>
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