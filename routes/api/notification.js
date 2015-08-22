var notificationRepository = require('../../repositories/notification');
module.exports = function (app) {

	app.get('/api/notification', function(req, res){
		res.render('index');
	});

	app.post('/api/notification', function(req, res){
		notificationRepository.add(req.body);
		res.send("Success?");
	});

};