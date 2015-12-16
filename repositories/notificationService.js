var Repository = require('../units/Repository');
var NotificationService = require('../schemas/notificationService');

var NotificaitionServiceRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = NotificationService;
};

NotificaitionServiceRepository.prototype = new Repository();

NotificaitionServiceRepository.prototype.findByServiceType = function(serviceType, callback) {

	var model = this.model;
	var query = model.findOne({name: serviceType});
	query.exec(callback);

};

module.exports = new NotificaitionServiceRepository();