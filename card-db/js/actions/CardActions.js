var AppDispatcher = require('../dispatcher/AppDispatcher');

var CardActions = {
  setEditing: function(id) {
    AppDispatcher.handleEditCardAction(id);
  }
};

module.exports = CardActions;
