/**
* @jsx React.DOM
*/
var React = require('react');

var CardStore = require('../stores/cards');

var CardsTable = require('./CardsTable.react');

CardStore.fetch();

var CardDBFE = React.createClass({

  getInitialState: function() {
    return {
      cards: CardStore.getAll(),
      minionTypes: CardStore.getMinionTypes()
    };
  },

  componentDidMount: function() {
    CardStore.addListener('change', this.onChange);
  },

  componentWillUnmount: function() {
    CardStore.removeListener('change', this.onChange);
  },

  render: function () {
    return (
      <CardsTable cards={this.state.cards} minionTypes={this.state.minionTypes}></CardsTable>
    );
  },

  onChange: function () {
    this.setState({
      cards: CardStore.getAll(),
      minionTypes: CardStore.getMinionTypes()
    });
  }
});

module.exports = CardDBFE;
