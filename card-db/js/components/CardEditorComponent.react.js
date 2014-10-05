/**
* @jsx React.DOM
*/
var React = require('react');
var _ = require('lodash');

var CardStore = require('../stores/cards');

var CardEditorComponent = React.createClass({
  propTypes: {
    card: React.PropTypes.object.isRequired,
    minionTypes: React.PropTypes.array.isRequired
  },

  submitCard: function (e) {
    console.log(this);
    CardStore.update();
    e.preventDefault();
  },

  render: function () {
    var card = this.props.card,
        minionTypes = this.props.minionTypes,
        minionTypeOptions = _.map(minionTypes, function (minionType) {
          return <option value={minionType.id}>{minionType.minion_type}</option>
        });
    return (<tr>
      <td>
        <input type="number" disabled defaultValue={card.id} />
      </td>
      <td>
        <input type="text" defaultValue={card.name} />
      </td>
      <td>
        <input type="number" defaultValue={card.health} />
      </td>
      <td>
        <input type="number" defaultValue={card.attack} />
      </td>
      <td>
        <input type="number" defaultValue={card.cost} />
      </td>
      <td>
        <select>
          {minionTypeOptions}
        </select>
      </td>
      <td>
        <button className="done" data-id="{card.id}" onClick={this.submitCard}>Done</button>
        <button className="delete" data-id="{card.id}">X</button>
      </td>
      </tr>);
  }
});

module.exports = CardEditorComponent;
