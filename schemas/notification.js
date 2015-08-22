var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notificationSchema = new Schema({
	title : String,
	message : String,
	idApps : String,
	link : String,
	date : String
});
// var tests = new Schema({
// 	name: String,
// 	category: String,
// 	file: String,
// 	isDeleted: bollean
// });

module.exports = mongoose.model('Notification', notificationSchema);