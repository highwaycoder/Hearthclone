/**
* @jsx React.DOM
*/
var React = require('react/addons');
var _ = require('lodash');

var CardStore = require('../stores/cards');

var CardEditorComponent = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  propTypes: {
    card: React.PropTypes.object.isRequired,
    minionTypes: React.PropTypes.array.isRequired
  },

  getInitialState: function () {
    return _.clone(this.props.card);
  },

  submitCard: function (e) {
    console.log(this.state);
    CardStore.update(this.state);
    e.preventDefault();
  },

  render: function () {
    var card = this.props.card,
        minionTypes = this.props.minionTypes,
        minionTypeOptions = _.map(minionTypes, function (minionType, index) {
          return <option value={minionType.minion_type_id}>{minionType.minion_type}</option>
        });
    return (<tr>
      <td>
        <input type="number" disabled valueLink={this.linkState('id')} />
      </td>
      <td>
        <input type="text" valueLink={this.linkState('name')} />
      </td>
      <td>
        <input type="number" valueLink={this.linkState('health')} />
      </td>
      <td>
        <input type="number" valueLink={this.linkState('attack')} />
      </td>
      <td>
        <input type="number" valueLink={this.linkState('cost')} />
      </td>
      <td>
        <select valueLink={this.linkState('type')}>
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
