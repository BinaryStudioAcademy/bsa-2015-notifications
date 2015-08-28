var app = require('./app');

app.controller('ModalNotifAppController', function ($modalInstance, $resource, notificationService, notificationServices) {
	var vm = this;
    vm.notificationServices = notificationServices;
    vm.notificationService = notificationService;
    vm.tmpSrc = notificationService.logo;
    vm.tmpName = notificationService.name;

    vm.save = function () {
      vm.notificationService.logo = vm.tmpSrc;
      vm.notificationService.name = vm.tmpName;
      $modalInstance.close(vm.notificationService);
    };

    vm.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    vm.delete = function (){
        var index = vm.notificationServices.indexOf(notificationService);
        var NotifServices = $resource('/api/notificationservice/:id', {id: '@id'}, {'delete': { method:'DELETE' }});
        var notifapp = NotifServices.delete({id: vm.notificationService._id}, function(res){
                console.log("Deleted successfully!");
            }, function(err){
                console.log(err);
            });

        vm.notificationServices.splice(index, 1);
        $modalInstance.dismiss('delete');
    };
});