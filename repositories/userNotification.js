var Repository = require('../units/Repository');
var UserNotification = require('../schemas/userNotification');

var UserNotificaitionRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = UserNotification;
};

UserNotificaitionRepository.prototype = new Repository();

UserNotificaitionRepository.prototype.getByUserId = function(id, callback) {
	var model = this.model;
	var query = model.find({userId: id/*, isRead: false*/});
	query.exec(callback);
};
UserNotificaitionRepository.prototype.deleteById = function(id, callback){
	var model = this.model;
	var query = model.remove({notificationId: id});
	query.exec(callback);
};
UserNotificaitionRepository.prototype.updateAllByUserId = function(id, body, callback){
	var model = this.model;
	var query = model.update({userId: id}, body, { multi: true });
	query.exec(callback);
};

module.exports = new UserNotificaitionRepository();