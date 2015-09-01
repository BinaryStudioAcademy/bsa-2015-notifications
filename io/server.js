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
		socketManager.addSocketToUser(socket.request.user.id, socket.id);
		roomManager.addUserToRoom(socket.request.user.id, 'user_' + socket.request.user.id);
		socket.emit('YOLO!');

		socket.on('disconnect', function () {
			socketManager.removeSocketFromUser(socket.request.user.id, socket.id);
		});

		socket.on('message_on_connection', function(text){
			appContext.io.to('user_' + socket.request.user.id).emit('welcome', socket.request.user.id);
		});

		socket.on('title', function(text){
			appContext.io.to('user_' + socket.request.user.id).emit('title', text);
		});

	});
	
 return appContext.io;
};