/**
* @jsx React.DOM
*/
var React = require('react');
var MinionActions = require('../actions/MinionActions');
var MinionStore = require('../stores/MinionStore');
var $ = require('jquery');

var CardViewerComponent = React.createClass({

  propTypes: {
    card: React.PropTypes.object.isRequired
  },

  editMode: function (e) {
    MinionActions.setEditing(this.props.card.id);
  },

  deleteCard: function (e) {
    MinionActions.deleteCard(this.props.card.id);
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
        <button className="edit" data-id={card.id} onClick={this.editMode} className="form-control">Edit</button>
        <button className="delete" data-id={card.id} onClick={this.deleteCard} className="form-control">Delete</button>
      </td>
      </tr>);
  }
});

module.exports = CardViewerComponent;
