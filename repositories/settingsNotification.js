var Repository = require('../units/Repository');
var SettingsNotification = require('../schemas/settingsNotification');

var SettingsNotificaitionRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = SettingsNotification;
};

SettingsNotificaitionRepository.prototype = new Repository();

SettingsNotificaitionRepository.prototype.findByCriteria = function() {

};

module.exports = new SettingsNotificaitionRepository();