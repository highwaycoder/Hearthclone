var AppDispatcher = require('../dispatcher/AppDispatcher');
var CardConstants = require('../constants/CardConstants');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var $ = require('jquery');
var _ = require('lodash');

var cards = {};
var minionTypes = {};

var edit = function(id) {
  var card = _.find(cards.items, function(card) {
    return card.id === id;
  });

  card.isEditing = true;
};

var CardStore = merge(EventEmitter.prototype, {
  getAll: function() {
    return cards;
  },
  getBlankCard: function () {
      return _.map(cards[0], function (value, key) {
        return;
      });
  },
  getMinionTypes: function() {
    return minionTypes;
  },
  update: function (card) {
    var self = this;
    $.ajax({
      method: card.id ? 'post' : 'create',
      url: '/card-db/api/minions/' + (card.id || ''),
      data: card,
      contentType: 'application/json',
      success: function (result) {
        if(card.id) {
          var appropriateCardIndex = _.findIndex(cards, function (card) {
            return (result.id === card.id);
          });
          cards[appropriateCardIndex] = result;
        } else {
          cards.items.push(result);
        }
      }
    });
  },
  fetch: function() {
    var self = this;
    $.get('/card-db/api/minions', function(result) {
      cards.items = result.minions.rows;
      minionTypes = result.minionTypes.rows;
      self.emit('change');
    });
  }
});

AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case CardConstants.EDIT:
      edit(action.id);
      break;
    default: return true;
  }

  CardStore.emit('change');

});

module.exports = CardStore;
