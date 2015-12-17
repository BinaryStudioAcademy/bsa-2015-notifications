var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notificationSchema = new Schema({
		title : String,
		text : String,
		images: Array,
		time : Date, // time when message was send
		url : String, // URL to redirect when click on message
		sound : Boolean, // true by default		
		serviceType: String // QA platform, Code Review Requests, Accounting...
});

module.exports = mongoose.model('Notification', notificationSchema);