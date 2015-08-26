var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notificationServiceSchema = new Schema({
	name: String,
	logo: String 
});

module.exports = mongoose.model('NotificationService', notificationServiceSchema);