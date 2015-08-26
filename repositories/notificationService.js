var Repository = require('../units/Repository');
var NotificationService = require('../schemas/notificationService');

var NotificaitionServiceRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = NotificationService;
};

NotificaitionServiceRepository.prototype = new Repository();

NotificaitionServiceRepository.prototype.findByCriteria = function() {

};

module.exports = new NotificaitionServiceRepository();