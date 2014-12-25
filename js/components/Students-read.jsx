var React = require('react');
var StudentActions = require('../actions/StudentActions');
var Router = require('../actions/RouteActions');
var TestStore = require('../stores/TestStore');
var PassagesStore = require('../stores/PassageStore');
var _ = require('lodash');

function getTestInfo(id) {
    return {
        tests: TestStore.getTestsByStudentId(id),
        passages: PassagesStore.getPassages()
    }
}

module.exports = React.createClass({


    getInitialState: function() {
        return getTestInfo(this.props.state.currentStudent.id);
    },

    componentWillMount: function() {
        TestStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TestStore.removeChangeListener(this._onChange);
    },

    render: function() {
        if(this.state.tests) {
            var tests = this.state.tests.map(function(test,i) {
                var date = new Date(test.createdAt);
                var passage = _.find(this.state.passages, {'id': test.attributes.passage.id});
                return (
                    <li key={i}>
                        <div className="container">
                            <span>{passage.title}</span>
                            <span>{date.getMonth() +1}/{date.getDate()}/{date.getFullYear()}</span>
                            <span>Score</span>
                            <span><button>View Test</button></span>
                        </div>
                    </li>
                )
            }.bind(this));
        }


        var currentStudent = this.props.state.currentStudent;
        return (
            <div>
                <div className="container top-padding">
                    <h2>{currentStudent.name}</h2>
                    <p dangerouslySetInnerHTML={{__html: currentStudent.notes}} />

                </div>

                <div className="previous-test">
                    <div className="container">
                        <h3>Previous Tests</h3>
                    </div>
                    <div className="table-list">
                        <ul>
                            <li className="headings">
                                <div className="container">
                                    <span>Passage</span>
                                    <span>Date</span>
                                    <span>Score</span>
                                    <span>Actions</span>
                                </div>
                            </li>
                            {this.state.tests ? tests : ""}

                        </ul>
                    </div>

                </div>
                <div className="button-wrap">
                    <div className="container">
                        <button onClick={this.props.list}>&larr; Back to Student List</button>
                        <button onClick={this.props.showEditForm.bind(null, currentStudent.id)}>Update {currentStudent.name}</button>
                        <button onClick={this.props.createTest.bind(null, currentStudent.id)} className="dangerous-action">Test {currentStudent.name}</button>
                    </div>
                </div>
            </div>


        )
    },

    _onChange: function() {
        this.setState(getTestInfo(this.props.state.currentStudent.id));
    }
});