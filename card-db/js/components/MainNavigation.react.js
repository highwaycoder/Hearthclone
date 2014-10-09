/**
* @jsx React.DOM
*/
var React = require('react');

var Router = require('react-router');
var Link = Router.Link;

var MainNavigation = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },

  componentWillUnmount: function() {
  },

  render: function () {
    return (<div>
      <Link to="minions">Minion Table</Link>
    </div>);
  },

  onChange: function () {
  }
});

module.exports = MainNavigation;
