var $ = require('jquery');
var _ = require("lodash");
$(function() {
	var login = require('./login');
	var hearthstone = function (initState) {
		login().then(setupSocket);
	};

	function setupSocket(connectionInfo) {
		var socket = io("localhost:3000", {
			query: 'token=' + connectionInfo.token
		});

		socket.on('deck_list', function (deckList) {

		});
		socket.emit('first_start');
	}

	hearthstone({
		$el: $("#hearthstone")
	});

});
