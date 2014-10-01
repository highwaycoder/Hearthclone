var hearthclone = require('./hearthclone');
var io = require('socket.io');
var config = require('./config');
var _ = require('lodash');
var clientServer = require('./clientServer');

function startServer(io) {
	var playerPool = [];
	io.listen(config.listenPort);
	io.on('connection', function (socket) {
		socket.on('find_game', function (playerInfo) {
			playerPool.push({
				socket: socket,
				playerInfo: playerInfo
			});
		});
	});
}