var app = require('./app');

app.controller('SettingsController', SettingsController);

function SettingsController($resource) {

	var vm = this;
    vm.userId = 1;
    vm.services = [];
    vm.settings = [];

    getServices();

    function getServices(){
        var NotificationServices = $resource('http://team.binary-studio.com/app/api/notificationService');
        var notserv = NotificationServices.query(function(res){
            vm.services = res;
            getSettings();
            
        }, function(err){
            console.log(err);
        });
    }
    function getSettings(){
        var Settings = $resource('http://team.binary-studio.com/app/api/settingsnotification/:id', {id:'@id'});
        var sett = Settings.query({id: vm.userId}, function(res) {
            vm.services = mixSettings(vm.services, res);
        });
    }
    function mixSettings(services, settings){
        angular.forEach(services, function(service){
            angular.forEach(settings, function(setting){
                if(service.name == setting.notificationType){
                    service.setting = setting;
                }
            });
        });
        angular.forEach(services, function(service){
            if(!service.setting){
                service.setting = {};
                service.setting.toInform = service.toInform;
                service.setting.sound = service.sound;
            }
        });
        return services;
    }
    vm.changeSetting = function(obj){
        console.log(obj);
        if(obj.setting._id){
            var Settings = $resource('http://team.binary-studio.com/app/api/settingsnotification/'+ obj.setting._id, null, {'update': { method:'PUT' }});
            var sett = Settings.update(obj.setting, function(res){
            });
        }else{
            var newSettingsObj = {};
            newSettingsObj.userId = vm.userId;
            newSettingsObj.notificationType = obj.name;
            if(!obj.setting.toInform){
                newSettingsObj.toInform = false;
            }else{
                newSettingsObj.toInform = true;
            }
            if(!obj.setting.sound){
                newSettingsObj.sound = false;
            }else{
                newSettingsObj.sound = true;
            }
            var SettingsK = $resource('http://team.binary-studio.com/app/api/settingsnotification/');
            var settK = SettingsK.save(newSettingsObj, function(res){
                angular.forEach(vm.services, function(service){
                    if(service.name == res.notificationType){
                        service.setting = res;
                    }
                });
            });
        }
    };
}