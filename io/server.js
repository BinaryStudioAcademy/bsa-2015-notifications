var socketio = require('socket.io');
var config = require('../config/');
var mongoStore = require('../units/appContext');
var appContext = require('../units/appContext');
var socketManager = require('./socketManager');
var roomManager = require('./roomManager');
var mediator = require('../units/mediator');
var auth = require('./auth');

module.exports = function(server){
	
	appContext.io = socketio(server);

	appContext.io.use(auth({
		secret: config.jwt.secret
	}));

	appContext.io.on('connection', function (socket) {
		// socketManager.addSocketForUser(socket.request.user.id, socket.id);
		socket.emit('YOLO!');

		socket.on('disconnect', function () {
			// socketManager.removeSocketForUser(socket.request.user.id, socket.id);
		});

		socket.on('message_on_connection', function(text){
			console.log(text);
		});

	});
	
 return appContext.io;
};