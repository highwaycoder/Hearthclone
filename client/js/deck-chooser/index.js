var _ = require('lodash');

module.exports = function (initState) {
  return function (deckList) {
    // TODO: make template, then do this properly
    initState.$el.empty();
    initState.$el.append("<ul>");
    initState.$el.append(_.map(deckList, function (deck) {
      return "<li>" + deck.hero + "</li>";
    }).join(''));
  }
}
