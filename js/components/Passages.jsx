var React = require('react');
var jQuery = require('jquery');
var PassageActions = require('../actions/PassageActions');
var PassageStore = require('../stores/PassageStore');

var getSuccessMessage = () => {
    return {
        success: PassageStore.getSuccessMessage()
    }
};

module.exports = React.createClass({

    handleCreate: function(e) {
        e.preventDefault();

        var formData = {};
        jQuery(e.target).serializeArray()
            .map(item => {
                formData[item.name] = item.value;
            });
        PassageActions.create(formData);

    },

    getInitialState: function () {
        return getSuccessMessage();
    },


    componentWillMount: function() {
        PassageStore.addChangeListener(this._onPassageChange);

    },

    componentWillUnmount: function() {
        PassageStore.removeChangeListener(this._onPassageChange);
    },

    getAllPassages: function() {
        PassageActions.getAll();
    },

    render: function() {

        var form = (
            <div className="form-wrap container">
                <form onSubmit={this.handleCreate}>
                    <h2>Add Passage</h2>
                    <p className="success">{this.state.success}</p>
                    <input type="text" name="title" placeholder="Title"/>
                    <input type="text" name="difficulty" placeholder="Difficulty"/>
                    <textarea name="content" placeholder="Content"/>
                    <input type="submit" />
                </form>

                <button onClick={this.getAllPassages}>Get All</button>

            </div>
        );

        return (
            <div>
                {form}
            </div>
        )
    },

    _onPassageChange: function() {
        this.setState(getSuccessMessage());
    }
});