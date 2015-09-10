var notificationRepository = require('../repositories/notification');
var userNotificationRepository = require('../repositories/userNotification');
var notificationServiceRepository = require('../repositories/notificationService');
var async = require('../bower_components/async/dist/async');

var NotificationService = function(){

};
NotificationService.prototype.getAll = function(callback){
	notificationRepository.getAll(function(err, data){
		async.map(data, function(notification, asyncCallback){
			var notificationObject = notification.toObject();
			notificationServiceRepository.findByServiceType(notificationObject.serviceType, function(err, type){
				if (type){
					notificationObject.serviceLogo = type.logo;
				}
				asyncCallback(null, notificationObject);
			});
		}, function (errFromIterator, results){
	                if(errFromIterator){
	                    callback(errFromIterator);
	                } 
	                callback(null, results);
	       });
	});
};
NotificationService.prototype.deleteById = function(id, callback){
	notificationRepository.delete(id, function(err, data){
		userNotificationRepository.deleteById(id, function(e, d){
			callback(null, "Deleted successfully.");
		});
	});
};
NotificationService.prototype.generateNotification = function() {

};

module.exports = new NotificationService();