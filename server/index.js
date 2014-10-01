var hearthclone = require('./hearthclone');
var config = require('./config');
var _ = require('lodash');
var clientServer = require('./clientServer');
var io = require('socket.io')(clientServer);

function startServer(io) {
	var playerPool = [];
	io.listen(config.listenPort);
	io.on('connection', function (socket) {
		console.log("A client connected. Finding a game... ");
		socket.on('find_game', function (playerInfo) {
			console.log("Found a game!");
			playerPool.push({
				socket: socket,
				playerInfo: playerInfo
			});
		});
	});
}

startServer(io);