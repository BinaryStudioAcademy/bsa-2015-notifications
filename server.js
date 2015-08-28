var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var mongooseConnection = require('./db/dbconnect').connection;

var app = express();

staticPath = path.normalize(__dirname + '/bower_components');
app.use('/bower_components', express.static(staticPath));
app.use('/', express.static(__dirname + '/public'));

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "DELETE,GET,POST,PUT");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	return next();
});

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

var routes = require('./routes/')(app);

var server = app.listen(4033);

console.log("Server started.");

module.exports = app;