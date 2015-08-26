var Repository = require('../units/Repository');
var UserNotification = require('../schemas/userNotification');

var UserNotificaitionRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = UserNotification;
};

UserNotificaitionRepository.prototype = new Repository();

UserNotificaitionRepository.prototype.findByCriteria = function() {

};

module.exports = new UserNotificaitionRepository();