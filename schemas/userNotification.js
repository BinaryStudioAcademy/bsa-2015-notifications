var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userNotificationSchema = new Schema({
		userId: String,
		notificationId: String,
		isRead: Boolean 
});



module.exports = mongoose.model('UserNotification', userNotificationSchema);