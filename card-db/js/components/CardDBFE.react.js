/**
* @jsx React.DOM
*/
var React = require('react');

var MinionStore = require('../stores/MinionStore');

var MinionTable = require('./MinionTable.react');

MinionStore.fetch();

var CardDBFE = React.createClass({
  getInitialState: function() {
    return {
      minions: MinionStore.getAll(),
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
    return <MinionTable cards={this.state.minions} minionTypes={this.state.minionTypes}></MinionTable>
  },

  onChange: function () {
    this.setState({
      minions: MinionStore.getAll(),
      minionTypes: MinionStore.getMinionTypes()
    });
  }
});

module.exports = CardDBFE;
