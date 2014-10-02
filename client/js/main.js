document.addEventListener("DOMContentLoaded", function() {

	var _ = require("lodash");
	var $ = require('jquery');

	var hearthstone = function (el) {
		console.log('create login screen here');
	};

	function setupSocket(token) {
		var socket = io("localhost:3000", {
			query: 'token=' + token
		});

		socket.emit('first_start');

		hearthstone({
			el: document.getElementById("hearthstone")
		});
	}

	$.post('/login', {
		username: 'foo',
		password: 'bar'
	}).done(function (result) {
		setupSocket(result.token);
	});

}, false);
