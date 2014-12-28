var React = require('react');
var jQuery = require('jquery');
var Router = require('../actions/RouteActions');

var StudentStore = require('../stores/StudentStore');
var TestStore = require('../stores/TestStore');
var PassagesStore = require('../stores/PassageStore');
var PassageActions = require('../actions/PassageActions');
var TestActions = require('../actions/TestActions');
var Review = require('./Passages-read.jsx');

var GraderInterface = require('./GradeInterface.jsx');

var PassageSelection = require('./Test-PassageSelection.jsx');

var getTestState = () => {
    return {
        currentStudent: StudentStore.getCurrentStudent(),
        passages: PassagesStore.getPassages(),
        view: TestStore.getTestCurrentView(),
        currentPassage: PassagesStore.getCurrentPassage()
    }
};

module.exports = React.createClass({

    getInitialState: () => {
        return getTestState();
    },

    //if there isn't a current student this view is invalid
    componentDidMount: function() {
        if(!StudentStore.getCurrentStudent()) {
            //todo figure out gracefull redirect
            window.location = '/#';
            Router.navigate('/students');
        }
        if(!PassagesStore.getPassages().length) {
            PassagesStore.initialize();
        }

    },

    componentWillMount: function() {
        TestStore.addChangeListener(this._onChange);
        PassagesStore.addChangeListener(this._onChange);
        PassagesStore.initialize();
    },

    componentWillUnmount: function() {
        TestStore.removeChangeListener(this._onChange);
        PassagesStore.removeChangeListener(this._onChange);
        TestActions.switchView('selection');

    },

    reviewPassage: function(id) {
        PassageActions.setCurrent(id);
        TestActions.switchView('review');
    },

    backToList: function() {
        TestActions.switchView('selection');
    },

    selectText: function(id) {
        PassageActions.setCurrent(id);
        TestActions.switchView('grade');
    },

    render: function() {

        var output;
        switch(this.state.view) {

            case 'selection':
                output = <PassageSelection {...this} />;
                break;
            case 'review':
                output = <Review {...this} selectionButton={true} />;
                break;
            case 'grade':
                output = <GraderInterface
                    passage={this.state.currentPassage.attributes.content}
                    studentName={this.state.currentStudent.attributes.name}
                    passageName={this.state.currentPassage.attributes.title}
                />;
                break;
            default:
                output = <PassageSelection {...this} />;
                break;
        }

        return output
    },

    _onChange: function() {
        this.setState(getTestState());
    }


});