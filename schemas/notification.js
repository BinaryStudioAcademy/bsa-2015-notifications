var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notificationSchema = new Schema({
			
		title : String,
		time : String, // time when message was send
		url : String, // URL to redirect when click on message
		sound : Boolean, // true by default		
		serviceType: String // QA platform, Code Review Requests, Accounting...
	
});

// var userNotificationSchema = new Schema({
			
		
// 		userId: String,
// 		notificationId: String,
// 		isRead: Boolean // QA platform, Code Review Requests, Accounting...
	
// });

// var userSettindsNotificationSchema = new Schema({
			
		
		
// 		userId: String,
// 		notificationType: String,
// 		toInform: Boolean
	
// });


module.exports = mongoose.model('Notification', notificationSchema);