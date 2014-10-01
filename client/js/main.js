document.addEventListener("DOMContentLoaded", function() {

	var _ = require("lodash");

	var hearthstone = function (el) {
		console.log("foo");
	};

	var socket = io("localhost:3000");

	hearthstone({
		el: document.getElementById("hearthstone")
	});

}, false);