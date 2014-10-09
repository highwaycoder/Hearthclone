/**
* @jsx React.DOM
*/
var React = require('react');

var MinionStore = require('../stores/MinionStore');

var CardsTable = require('./MinionTable.react');

MinionStore.fetch();

var CardDBFE = React.createClass({

  getInitialState: function() {
    return {
      cards: MinionStore.getAll(),
      minionTypes: MinionStore.getMinionTypes()
    };
  },

  componentDidMount: function() {
    MinionStore.addListener('change', this.onChange);
  },

  componentWillUnmount: function() {
    MinionStore.removeListener('change', this.onChange);
  },

  render: function () {
    return (
      <CardsTable cards={this.state.cards} minionTypes={this.state.minionTypes}></CardsTable>
    );
  },

  onChange: function () {
    this.setState({
      cards: MinionStore.getAll(),
      minionTypes: MinionStore.getMinionTypes()
    });
  }
});

module.exports = CardDBFE;
