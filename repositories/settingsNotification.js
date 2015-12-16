var Repository = require('../units/Repository');
var SettingsNotification = require('../schemas/settingsNotification');

var SettingsNotificaitionRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = SettingsNotification;
};

SettingsNotificaitionRepository.prototype = new Repository();

SettingsNotificaitionRepository.prototype.findByUserId = function(userId, callback) {

	var model = this.model;
	var query = model.find({userId: userId});
	query.exec(callback);

};

module.exports = new SettingsNotificaitionRepository();