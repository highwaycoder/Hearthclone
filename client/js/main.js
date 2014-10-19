var $ = require('jquery');
var _ = require("lodash");
$(function() {
	var login = require('./login');
	var hearthstone = function (initState) {
		login(initState).then(setupSocket);
	};

	function setupSocket(connectionInfo) {
		var socket = io("localhost:3000", {
			query: 'token=' + connectionInfo.token
		});

		socket.on('deck_list', function (deckList) {
			console.log(deckList);
		});
		socket.emit('first_start');
	}

	hearthstone({
		$el: $("#hearthstone")
	});

});
