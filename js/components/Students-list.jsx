var React = require('react');
var Fuse = require('fuse.js');
var StudentStore = require('../stores/StudentStore');
var StudentActions = require('../actions/StudentActions');
var TestStore = require('../stores/TestStore');


function getStudentsInfo() {
    return {
        success: StudentStore.getStudentSuccessMessage(),
        students: StudentStore.getStudents()
    }
}

module.exports = React.createClass({

    getInitialState: function() {
        return getStudentsInfo();
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
            keys: ['attributes.name']
        };

        var fuse = new Fuse(this.state.students, options);

        this.setState({
            students: fuse.search(searchString)
        })
    },

    componentWillMount: function() {
        StudentActions.getAll();
        StudentStore.addChangeListener(this._onChange);
        TestStore.addChangeListener(this._onChange);
        TestStore.initalize();
    },

    componentWillUnmount: function() {
        StudentStore.removeChangeListener(this._onChange);
        TestStore.removeChangeListener(this._onChange);
    },

    sortBy: function(attribute) {
        var students = this.state.students;

        var sortedStudents = students.sort(function(a, b) {
            var aName = a.attributes[attribute];
            var bName = b.attributes[attribute];

            if (aName > bName) {
                return 1;
            }
            if (aName < bName) {
                return -1;
            }
            return 0;
        });

        this.setState({
            students: sortedStudents
        });

    },

    render: function() {
        return (
            <div>
                <div className="header-wrap">
                    <div className="container">
                        <header>Students</header>
                        <div className="serach-wrap">
                            <input onChange={this.search} type="search" placeholder="Search...."/>
                        </div>
                        <div className="button-wrap">
                            <button className="add" onClick={this.props.showAddForm}>+ Student</button>
                        </div>
                    </div>
                </div>
                <div className="table-list">
                    <ul>
                        <li className="headings">
                            <div className="container">
                                <span onClick={this.sortBy.bind(null, 'name')}>Name</span>
                                <span>Last Test</span>
                                <span>Actions</span>
                            </div>
                        </li>
                        {this.state.students.map(function(student) {
                            var mostRecentTestDate = TestStore.mostRecentTest(student.id);
                            var dateString = 'No Tests Yet';

                            if (mostRecentTestDate) {
                                var date = new Date(mostRecentTestDate.createdAt);
                                dateString = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
                            }

                            return (
                                <li key={student.id}>
                                    <div className="container">
                                        <a onClick={this.props.read.bind(null,student.id)}>{student.attributes.name}</a>
                                        <span>{dateString}</span>
                                        <span className="actions">
                                            <button className="edit" onClick={this.props.showEditForm.bind(null, student.id)}>
                                                Edit
                                            </button>
                                            <button onClick={this.props.createTest.bind(null, student.id)} className="delete">
                                                Test
                                            </button>
                                        </span>
                                    </div>
                                </li>
                            );
                        }.bind(this))}
                    </ul>
                </div>
            </div>
        )
    },

    _onChange: function() {
        this.setState(getStudentsInfo());
    }


});