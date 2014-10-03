document.addEventListener("DOMContentLoaded", function() {

	var _ = require("lodash");
	var $ = require('jquery');

	var hearthstone = function (initState) {
		var loginTemplate = require('../templates/login.hbs'),
				$formEl;
		initState.$el.append(loginTemplate());
		$formEl = $('form.login');
		$formEl.on('submit', function (e) {
			function mapize(prev, cur) {
				prev[cur.name] = cur.value;
				return prev; 
			}
			console.log($formEl.serializeArray().reduce(mapize, {}));
			console.log('form submitted');
			e.preventDefault();
		});
	};

	function setupSocket(token) {
		var socket = io("localhost:3000", {
			query: 'token=' + token
		});

		socket.emit('first_start');

		hearthstone({
			$el: $("#hearthstone")
		});
	}

	$.post('/login', {
		username: 'foo',
		password: 'bar'
	}).done(function (result) {
		setupSocket(result.token);
	});

}, false);
