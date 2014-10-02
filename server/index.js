var hearthclone = require('./hearthclone');
var passport = require('passport');
var bundle = require('socket.io-bundle');
var ioPassport = require('socket.io-passport');
var config = require('./config');
var _ = require('lodash');
var clientServer = require('./clientServer');
var io = require('socket.io')(clientServer);

function startServer(io) {
	var playerPool = [];
	io.listen(config.listenPort);

	passport.deserializeUser(function (id, done) {
		done(null, {id: id, name: 'Random Luser'});
	});

	io.use(bundle.cookieParser());
	io.use(bundle.session({secret: 'foobar'}));
	io.use(ioPassport.initialize());
	io.use(ioPassport.session());

	io.on('connection', function (socket) {
		console.log("A client connected. Finding a game... ", socket.request.user, socket.request.id);

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
}

startServer(io);
