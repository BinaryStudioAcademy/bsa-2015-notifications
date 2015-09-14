var SocketHandler = function(){

	var self = this;

	this.socket = io(window.socketserver.host);
	this.socket.on('connect', function(){
		self.onConnect();
	});
	this.socket.on('disconnect', function(){
		self.onDisconnect();
	});

	this.socket.on('welcome', function(data){
		console.log('welcome', data);
	});

	this.socket.on('title', function(data){
		console.log('title', data);
	});

};

SocketHandler.prototype.onConnect = function(){
	var sessionid = this.socket.io.engine.id;
	console.log(sessionid);
	console.log('user connected!');
};

SocketHandler.prototype.onDisconnect = function(){
	console.log('user disconnected!');
};

SocketHandler.prototype.sendMessage = function(channel, data) {
	this.socket.emit(channel, data);
};

var socketHandler = new SocketHandler();

module.exports = socketHandler;