/**
* @jsx React.DOM
*/
var React = require('react');

var CardDBFE = require('./components/CardDBFE.react');

React.renderComponent(
  <CardDBFE />,
  document.getElementById('card-db')
);
