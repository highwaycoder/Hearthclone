var hearthclone = require('./hearthclone');
var bundle = require('socket.io-bundle');
var socketJwt = require('socketio-jwt');
var config = require('./config');
var _ = require('lodash');
var clientServer = require('./clientServer');
var io = require('socket.io')(require('http').createServer());
var decks = require('../decks');
var constants = require('./constants');

function startServer(io) {
	var playerPool = [];

	// TODO: Move all the user auth crap into a separate module
	io.use(socketJwt.authorize({
		secret: constants.jwt_secret,
		handshake: true
	}));

	io.on('connection', function (socket) {
		console.log("Client connected: ", socket.decoded_token);

		socket.on('first_start', function () {
			var userDecks = _.filter(decks, function (deck) {
				// TODO: currently hack socket.decoded_token.id to be a number, should find a better way
				return (deck.userId === +socket.decoded_token.id)
			});
			socket.emit('deck_list', userDecks);
		});

		socket.on('find_game', function (playerInfo) {
			console.log("Found a game!");
			playerPool.push({
				socket: socket,
				playerInfo: playerInfo
			});
		});
	});

	io.listen(config.listenPort);
	console.log('socket.io server listening on port: ', config.listenPort);
}

startServer(io);
