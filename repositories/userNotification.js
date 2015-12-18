var Repository = require('../units/Repository');
var UserNotification = require('../schemas/userNotification');
var mongoose = require('mongoose');

var UserNotificaitionRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = UserNotification;
};

UserNotificaitionRepository.prototype = new Repository();

UserNotificaitionRepository.prototype.getByUserId = function(id, isRead, callback) {
	var model = this.model;
	// var ObjectID = mongoose.Types.ObjectId(id);
	console.log('ID: ', id);
	
	var notifications = {userId: id, isRead: false};
	var limit = 0;

	if (isRead){
		notifications = {userId: id};
		limit = 100;
	}
	
	var query = model.find(notifications).limit(limit);
	query.exec(callback);
};

UserNotificaitionRepository.prototype.deleteById = function(id, callback){
	var model = this.model;
	var query = model.remove({notificationId: id});
	query.exec(callback);
};
UserNotificaitionRepository.prototype.updateAllByUserId = function(id, body, callback){
	var model = this.model;
	var query = model.update({userId: id}, { $set: body }, { multi: true });
	query.exec(callback);
};

UserNotificaitionRepository.prototype.updateNotification = function(id, nid, body, callback){
	var model = this.model;
	var query = model.update({userId: id, notificationId: nid}, { $set: body });
	query.exec(callback);
};

module.exports = new UserNotificaitionRepository();
