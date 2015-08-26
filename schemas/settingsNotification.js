var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var settingsNotificationSchema = new Schema({
	

		
		userId: String,
		notificationType: String,
		toInform: Boolean
	
});


module.exports = mongoose.model('SettingsNotification', settingsNotificationSchema);