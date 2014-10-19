var express = require('express');
var middleware = express.Router();
var _ = require('lodash');
var cards = require('../../cards');
var jwt = require('jsonwebtoken');
var constants = require('../constants');
var decks = require('../../decks');

// TODO: massage 'cards' data into something we expect to get from the card-db
// server in the future.

var CardTypes = {
  MINION: 4
}

middleware.get('/', function (req, res) {
  res.json(cards);
});

middleware.get('/minion/', function (req, res) {
  res.json(_.filter(cards, function (card) {
    return card.type === CardTypes.MINION;
  }));
});

middleware.get('/minion/:id', function (req, res) {
  var card = cards[req.params.id];

  if (card) {
    if(card.type === CardTypes.MINION) {
      res.json(card);
    } else {
      // NB: this is wrong and bad.  Minions should have a separate 'minion id'
      // and 'card id' so that this cannot happen and would just be a 404.
      res.status(400);
      res.json({
        error: 'non-minion card requested from minion resource'
      });
    }
  } else {
    res.status(404);
    res.json({
      error: 'card not found'
    });
  }

});

middleware.get('/deck/', function (req, res) {
  jwt.verify(req.query.token, constants.jwt_secret, function (err, profile) {
    console.log(profile);
    var userDecks;
    if(err) {
      res.status(403).send({
        error: 'You must be logged in to access this service.'
      });
    } else {
      userDecks = _.filter(decks, function (deck) { return deck.userId === profile.id });
      if(userDecks.length < 1) {
        res.status(404).send({
          error: 'No decks found for user ' + profile.name + ' (id: ' + profile.id + ')'
        });
      } else {
        res.status(200).send(userDecks);
      }
    }
  });
})

module.exports = middleware;
