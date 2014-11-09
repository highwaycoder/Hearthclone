var Handlebars = require('hbsfy/runtime'),
    deckTemplate = require('./templates/deck.hbs'),
    chooserTemplate = require('./templates/chooser.hbs'),
    heroFriendlyNameHelper = require('./helpers/heroFriendlyName'),
    _ = require('lodash');

module.exports = function (initState) {
  Handlebars.registerPartial('deck', deckTemplate);
  Handlebars.registerHelper('getFriendlyNameForHero', heroFriendlyNameHelper);
  return function (deckList) {
    initState.$el.html(chooserTemplate({
      decks: deckList
    }));
  }
}
