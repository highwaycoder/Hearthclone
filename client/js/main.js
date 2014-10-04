var $ = require('jquery');
var _ = require("lodash");
$(function() {
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
			var formData = $formEl.serializeArray().reduce(mapize, {});
			$.ajax({
				method: 'POST',
				url: '/login',
				data: JSON.stringify(formData),
				success: function (result) {
					setupSocket(result.token);
				},
				contentType: 'application/json'
			});
			console.log('form submitted');
			e.preventDefault();
		});
	};

	function setupSocket(token) {
		var socket = io("localhost:3000", {
			query: 'token=' + token
		});

		socket.emit('first_start');
	}

	hearthstone({
		$el: $("#hearthstone")
	});

});
