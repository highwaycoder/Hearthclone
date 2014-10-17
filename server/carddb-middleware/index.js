var express = require('express');
var middleware = express.Router();
var _ = require('lodash');
var cards = require('../../cards');

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
    res.json(card);
  } else {
    res.status(404);
    res.json({
      error: 'card not found'
    });
  }
});

middleware.get('/deck/', function (req, res) {
  // pseudo:
  // 1. skip 2 if user logged in
  // 2. set status to 403, send error: 'you must be logged in to see your deck list'
  // 3. skip 4 if user has decks
  // 4. set status to 404, send error: 'no decks found'
  // 5. send decks associated with user
})

module.exports = middleware;
