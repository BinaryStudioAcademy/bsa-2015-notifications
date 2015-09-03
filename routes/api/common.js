var config = require('../../config/')

module.exports = function(app) {

	app.get('/api/config', function(req, res){
		res.json({
			loginserver: config.loginserver.host,
			notificationserver: config.notificationserver.host,
			userprofileserver: config.userprofileserver.host,
			socketserver: config.sockets.host
		});
	});
};