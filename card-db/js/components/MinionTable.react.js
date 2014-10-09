/**
* @jsx React.DOM
*/
var React = require('react');
var _ = require('lodash');

var MinionEditorComponent = require('./MinionEditorComponent.react');
var MinionViewerComponent = require('./MinionViewerComponent.react');
var MinionStore = require('../stores/MinionStore');

var MinionTable = React.createClass({

  propTypes: {
    cards: React.PropTypes.object.isRequired,
    minionTypes: React.PropTypes.array.isRequired
  },

  render: function () {
    var self = this;
    var minionTypes = this.props.minionTypes;

    var cards = _.map(this.props.cards.items, function(card) {
      if(card.isEditing) {
        return <MinionEditorComponent card={card} minionTypes={minionTypes}/>
      } else {
        return <MinionViewerComponent card={card} minionTypes={minionTypes}/>
      }
    });
    var blankCard = MinionStore.getBlankCard();

    cards.push(<MinionEditorComponent card={blankCard} minionTypes={minionTypes}/>);

    return (
      <table className="table">
        <tbody>
          <tr>
            <th>
              ID
            </th>
            <th>
              Name
            </th>
            <th>
              Health
            </th>
            <th>
              Attack
            </th>
            <th>
              Cost
            </th>
            <th>
              Type
            </th>
          </tr>
          {cards}
        </tbody>
      </table>
    );
  },
});

module.exports = MinionTable;
