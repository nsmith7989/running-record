var React = require('react');
var PassageActions = require('../actions/PassageActions');
var Router = require('../actions/RouteActions');
var TestStore = require('../stores/TestStore');
var PassagesStore = require('../stores/PassageStore');
var _ = require('lodash');
var scoreCalc = require('../utils/store-calc');
var TestActions = require('../actions/TestActions');

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
        PassagesStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TestStore.removeChangeListener(this._onChange);
        PassagesStore.removeChangeListener(this._onChange);
    },

    reviewTest: function(testData) {
        Router.navigate('/test');
        TestActions.setCurrentTest(testData);
        PassageActions.setCurrent(testData.attributes.passage.id);
        TestActions.switchView('view-test');
    },

    render: function() {
        if(this.state.tests) {
            var tests = this.state.tests.map(function(test, i) {
                var date = new Date(test.createdAt);
                var passage = _.find(this.state.passages, {'id': test.attributes.passage.id});
                var score = scoreCalc(test.attributes);
                return (
                    <li key={i}>
                        <div className="container">
                            <span>{passage.attributes.title}</span>
                            <span>{date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}</span>
                            <span>
                            {score.percentageCorrect}% | {score.time}
                            </span>
                            <span>
                                <button onClick={this.reviewTest.bind(null, test)}>View Test</button>
                            </span>
                        </div>
                    </li>
                )
            }.bind(this));
        }


        var currentStudent = this.props.state.currentStudent;
        return (
            <div>
                <div className="container top-padding">
                    <h2>{currentStudent.attributes.name}</h2>
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