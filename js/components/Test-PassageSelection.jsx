var React = require('react');

module.exports = React.createClass({

    render: function() {
        return (
            <div>
                <div className="header-wrap">
                    <div className="container">
                        <header>Select Passage For {this.props.state.currentStudent.name}</header>
                    </div>
                </div>
                <div className="table-list">
                    <ul>
                        <li className="headings">
                            <div className="container">
                                <span>Title</span>
                                <span>Level</span>
                                <span>Select</span>
                            </div>
                        </li>
                    {this.props.state.passages.map(function(passage) {
                        return (
                            <li key={passage.id}>
                                <div className="container">
                                    <a onClick={this.props.reviewPassage.bind(null, passage.id)}>{passage.attributes.title}</a>
                                    <span>{passage.attributes.difficulty}</span>
                                    <span>
                                        <button onClick={this.props.selectText.bind(null, passage.id)}>Select</button>
                                    </span>
                                </div>
                            </li>
                        );
                    }.bind(this))}
                    </ul>
                </div>
            </div>
        )
    }
});