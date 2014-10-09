/**
* @jsx React.DOM
*/
var React = require('react/addons');
var _ = require('lodash');

var MinionStore = require('../stores/MinionStore');
var MinionActions = require('../actions/MinionActions');

var CardEditorComponent = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  propTypes: {
    card: React.PropTypes.object.isRequired,
    minionTypes: React.PropTypes.array.isRequired
  },

  getInitialState: function () {
    return _.clone(this.props.card);
  },

  cancelEditing: function () {
    MinionActions.cancelEditing(this.props.card.id);
  },

  submitCard: function (e) {
    MinionStore.update(this.state);
    e.preventDefault();
  },

  deleteCard: function (e) {
    MinionActions.deleteCard(this.props.card.id);
  },

  render: function () {
    var card = this.props.card,
        minionTypes = this.props.minionTypes,
        minionTypeOptions = _.map(minionTypes, function (minionType, index) {
          return <option value={minionType.minion_type_id}>{minionType.minion_type}</option>
        }),
        shouldCancel = !!card.id,
        maybeCancelButton = shouldCancel ?
        // without the enclosing div, reactify complains about bad jsx :(
        <div class='editExisting'>
          <button className="delete" data-id="{card.id}" onClick={this.deleteCard}>Delete</button>
          <button className="cancel" data-id="{card.id}" onClick={this.cancelEditing}>Cancel</button>
        </div>
        :
        "";
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
        {maybeCancelButton}
      </td>
      </tr>);
  }
});

module.exports = CardEditorComponent;
