/**
* @jsx React.DOM
*/
var React = require('react');
var CardActions = require('../actions/CardActions');
var CardStore = require('../stores/cards');
var $ = require('jquery');

var CardViewerComponent = React.createClass({

  propTypes: {
    card: React.PropTypes.object.isRequired
  },

  editMode: function (e) {
    CardActions.setEditing(this.props.card.id, true);
  },

  render: function () {
    var card = this.props.card;
    return (<tr>
      <td>{card.id}</td>
      <td>{card.name}</td>
      <td>{card.health}</td>
      <td>{card.attack}</td>
      <td>{card.cost}</td>
      <td>{card.minion_type}</td>
      <td>
        <button className="edit" data-id={card.id} onClick={this.editMode}>Edit</button>
        <button className="delete" data-id={card.id}>Delete</button>
      </td>
      </tr>);
  }
});

module.exports = CardViewerComponent;
