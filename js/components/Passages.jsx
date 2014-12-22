var React = require('react');

module.exports = React.createClass({

    render: function() {

        var form = (
            <div className="form-wrap container">
                <form>
                    <h2>Add Passage</h2>
                    <input type="text" name="text" placeholder="Title"/>
                    <input type="text" name="difficulty" placeholder="Difficulty"/>
                    <textarea name="content" placeholder="Content"/>
                    <input type="submit" />
                </form>
            </div>
        );

        return (
            <div>
                {form}
            </div>
        )
    }
});