/**
* @jsx React.DOM
*/
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;

var CardDBFE = require('./components/CardDBFE.react');
var MainNavigation = require('./components/MainNavigation.react');

var App = React.createClass({
  render: function() {
    return <this.props.activeRouteHandler/>;
  }
});

var routes = (
  <Routes location="history">
    <Route name="app" path="/" handler={App}>
      <Route name="minions" handler={CardDBFE}/>
      <DefaultRoute handler={MainNavigation}/>
    </Route>
  </Routes>
);

React.renderComponent(
  routes,
  document.getElementById('card-db')
);

window.React = React;
