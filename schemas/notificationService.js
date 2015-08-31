var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notificationServiceSchema = new Schema({
	name: String,
	logo: String,
	toInform: Boolean,
	sound: Boolean 
});

module.exports = mongoose.model('NotificationService', notificationServiceSchema);