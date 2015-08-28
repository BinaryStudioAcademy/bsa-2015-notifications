
module.exports = function (app) {

	app.get('/', function(req, res){
		res.render('index');
	});
	app.get('/header', function(req, res){
		res.header('Access-Control-Allow-Origin', '*');
		res.render('header');
	});

};