var notificationRepository = require('../repositories/notification');
var userNotificationRepository = require('../repositories/userNotification');
var notificationServiceRepository = require('../repositories/notificationService');
var async = require('../bower_components/async/dist/async');

var NotificationService = function(){

};
NotificationService.prototype.getByUserId = function(id, isRead, callback){
	userNotificationRepository.getByUserId(id, isRead, function(err, data){
		async.map(data, function(notification, asyncCallback){
			notificationRepository.getById(notification.notificationId, function(err, res){
				if (res){
					notificationServiceRepository.findByServiceType(res.serviceType, function(err, type){
						var newObj = {};
						newObj._id = res._id;
						newObj.title = res.title;
						newObj.text = res.text;
						newObj.time = res.time;
						newObj.url = res.url;
						newObj.sound = res.sound;
						newObj.serviceType = res.serviceType;
						newObj.images = res.images;
						newObj.isRead = notification.isRead;
						if(type){
							newObj.serviceLogo = type.logo;
						}
						asyncCallback(null, newObj);
					});
				} else {
					asyncCallback(null, {});
				}
			});
		}, function (errFromIterator, results){
	                if(errFromIterator){
	                    callback(errFromIterator);
	                } 
	                callback(null, results);
	       });
	});
};
NotificationService.prototype.generateNotification = function() {

};

module.exports = new NotificationService();