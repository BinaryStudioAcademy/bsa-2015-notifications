var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notificationServiceSchema = new Schema({
	name: String,
	logo: String,
	link: String,
	toInform: Boolean,
	sound: Boolean 
});

module.exports = mongoose.model('NotificationService', notificationServiceSchema);