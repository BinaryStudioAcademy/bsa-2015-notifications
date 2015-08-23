var notification = require('./notification');
var userNotification =require('./userNotification');
var settingsNotification =require('./settingsNotification');
module.exports = function(app){
	return {
		notification: notification(app),
		userNotification: userNotification(app),
		settingsNotification: settingsNotification(app)
	};
};