var $ = require('jquery');
var _ = require('lodash');
var when = require('when');
var chooseDeck = require('./deck-chooser');

$(function() {
	var login = require('./login');
	var hearthstone = function (initState) {
		login(initState)
			.then(setupSocket)
			.then(chooseDeck(initState));
	};

	function setupSocket(connectionInfo) {
		return when.promise(function (resolve, reject) {
			var socket = io('localhost:3000', {
				query: 'token=' + connectionInfo.token
			});

			socket.on('deck_list', function (deckList) {
				resolve(deckList);
			});
			socket.emit('first_start');
		});
	}

	hearthstone({
		$el: $('#hearthstone')
	});

});
