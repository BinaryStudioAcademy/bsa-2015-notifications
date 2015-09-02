var config = require('../../config/');
module.exports = function (app) {

	app.get('/', function(req, res){
		res.render('index', {loginserver:config.loginserver.host,
		notificationserver:config.notificationserver.host,
		userprofileserver:config.userprofileserver.host});
	});
	app.get('/header', function(req, res){
		res.header('Access-Control-Allow-Origin', '*');
		res.render('header');
	});

};