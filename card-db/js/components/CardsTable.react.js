/**
* @jsx React.DOM
*/
var React = require('react');
var _ = require('lodash');

var CardEditorComponent = require('./CardEditorComponent.react');
var CardViewerComponent = require('./CardViewerComponent.react');
var CardStore = require('../stores/cards');

var CardsTable = React.createClass({

  propTypes: {
    cards: React.PropTypes.object.isRequired,
    minionTypes: React.PropTypes.array.isRequired
  },

  render: function () {
    var self = this;
    var minionTypes = this.props.minionTypes;

    var cards = _.map(this.props.cards.items, function(card) {
      if(card.isEditing) {
        return <CardEditorComponent card={card} minionTypes={minionTypes}/>
      } else {
        return <CardViewerComponent card={card} minionTypes={minionTypes}/>
      }
    });
    var blankCard = CardStore.getBlankCard();

    cards.push(<CardEditorComponent card={blankCard} minionTypes={minionTypes}/>);

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

module.exports = CardsTable;
