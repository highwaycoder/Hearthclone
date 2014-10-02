document.addEventListener("DOMContentLoaded", function() {

	var _ = require("lodash");

	var hearthstone = function (el) {
		console.log("foo");
	};

	var socket = io("localhost:3000");

	socket.emit('first_start');

	hearthstone({
		el: document.getElementById("hearthstone")
	});

}, false);
