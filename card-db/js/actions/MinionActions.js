var AppDispatcher = require('../dispatcher/AppDispatcher');

var MinionActions = {
  setEditing: function(id) {
    AppDispatcher.handleEditCardAction(id);
  },
  deleteCard: function (id) {
    AppDispatcher.handleDeleteCardAction(id);
  },
  cancelEditing: function (id) {
    AppDispatcher.handleCancelEditingCardAction(id);
  }
};

module.exports = MinionActions;
