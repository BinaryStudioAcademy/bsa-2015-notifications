var app = require('./app');

app.controller('ModalNotifAppController', function ($modalInstance, $resource, notificationService, notificationServices) {
	var vm = this;
    vm.notificationServices = notificationServices;
    vm.notificationService = notificationService;
    vm.tmpSrc = notificationService.logo;
    vm.tmpName = notificationService.name;
    vm.tmpToiform = notificationService.toInform;
    vm.tmpSound = notificationService.sound;

    vm.save = function () {
      vm.notificationService.logo = vm.tmpSrc;
      vm.notificationService.name = vm.tmpName;
      vm.notificationService.toInform = vm.tmpToiform;
      vm.notificationService.sound = vm.tmpSound;
      delete vm.notificationService.__v;

      $modalInstance.close(vm.notificationService);
    };

    vm.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    vm.delete = function (){
        var index = vm.notificationServices.indexOf(notificationService);
        var NotifServices = $resource('http://team.binary-studio.com/app/api/notificationservice/:id', {id: '@id'}, {'delete': { method:'DELETE' }});
        var notifapp = NotifServices.delete({id: vm.notificationService._id}, function(res){
                console.log("Deleted successfully!");
            }, function(err){
                console.log(err);
            });

        vm.notificationServices.splice(index, 1);
        $modalInstance.dismiss('delete');
    };

    vm.changeSetting = function(obj){
        console.log(obj);
    };
});