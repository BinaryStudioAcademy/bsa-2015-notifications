var notification = require('./notification');
var userNotification =require('./userNotification');
var settingsNotification =require('./settingsNotification');
var notificationService = require('./notificationService');
var common = require('./common');
module.exports = function(app){
	return {
		notification: notification(app),
		userNotification: userNotification(app),
		settingsNotification: settingsNotification(app),
		notificationService: notificationService(app),
		common: common(app)
	};
};