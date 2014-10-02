var hearthclone = require('./hearthclone');
var bundle = require('socket.io-bundle');
var socketJwt = require('socketio-jwt');
var config = require('./config');
var _ = require('lodash');
var clientServer = require('./clientServer');
var io = require('socket.io')(require('http').createServer());

function startServer(io) {
	var playerPool = [];

	// TODO: Move all the user auth crap into a separate module
	io.use(socketJwt.authorize({
		secret: 'secret',
		handshake: true
	}));

	io.on('connection', function (socket) {
		console.log("A client connected. Finding a game for ", socket.decoded_token.name);

		socket.on('first_start', function () {

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
}

startServer(io);
