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

var deleteCard = function (id) {
  $.ajax({
    method: 'delete',
    url: '/api/minions/' + id,
    success: function () {
      _.remove(cards.items, function (card) {
        return card.id === id;
      });
      
      CardStore.emit('change');
    }
  });
}

var CardStore = merge(EventEmitter.prototype, {
  getAll: function() {
    return cards;
  },
  getBlankCard: function () {
      var card =  _.reduce(cards[0], function (acc, val, key){
        acc[val] = null;
        return acc;
      },{});

      // TODO: explicitly set to "Normal" instead of hard-coding the id of Normal cards
      card.type = "1";

      return card;
  },
  getMinionTypes: function() {
    return minionTypes;
  },
  update: function (card) {
    var self = this;
    card = _.omit(card, 'isEditing', 'minion_type_id', 'minion_type');
    $.ajax({
      method: card.id ? 'put' : 'post',
      url: '/api/minions/' + (card.id || ''),
      data: JSON.stringify(card),
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
        self.emit('change');
      }
    });
  },
  fetch: function() {
    var self = this;
    $.get('/api/minions', function(result) {
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
    case CardConstants.DELETE:
      deleteCard(action.id);
      break;
    default: return true;
  }

  CardStore.emit('change');
});

module.exports = CardStore;
