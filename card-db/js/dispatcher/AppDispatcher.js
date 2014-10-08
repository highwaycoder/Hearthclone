var Dispatcher = require('flux').Dispatcher;
var copyProperties = require('react/lib/copyProperties');
var CardConstants = require('../constants/CardConstants');
var AppDispatcher = copyProperties(new Dispatcher(), {

  /**
   * A bridge function between the views and the dispatcher, marking the action
   * as a view action.  Another variant here could be handleServerAction.
   * @param  {object} action The data coming from the view.
   */
  handleEditCardAction: function(id) {
    this.dispatch({
      actionType: CardConstants.EDIT,
      id: id
    });
  },

  handleDeleteCardAction: function (id) {
    this.dispatch({
      actionType: CardConstants.DELETE,
      id: id
    });
  }

});

module.exports = AppDispatcher;
