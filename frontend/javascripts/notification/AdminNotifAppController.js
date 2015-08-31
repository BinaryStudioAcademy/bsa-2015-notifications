var app = require('./app');

app.controller('AdminNotifAppController', function($resource, $modal, $timeout){

	var ctrl = this;
	ctrl.notificationServices = [];
	ctrl.notificationService = {};
	ctrl.isCollapsed = true;

	getNotificationServices();
	function getNotificationServices(){
        var NotificationServices = $resource('http://team.binary-studio.com/app/api/notificationservice');
        var notserv = NotificationServices.query(function(res){
        	console.log(res);
            ctrl.notificationServices = res;
        }, function(err){
            console.log(err);
        });
    }

    ctrl.addApp = function () {
    	var Apps = $resource('http://team.binary-studio.com/app/api/notificationservice', null, {'post': {method: 'POST'}});
    	var app = Apps.post(ctrl.notificationService, function (newApp) {
    		ctrl.notificationServices.push(newApp);
    	}, function(err) {
    		console.log(err);
    	});
    	ctrl.notificationService = {};
    };

    ctrl.open = function (obj) {
        var modalInstance = $modal.open({
          templateUrl: 'modalNotifApp.html',
          controller: 'ModalNotifAppController',
          controllerAs: 'modalnotifapp',
          resolve: {
            notificationService: function () {
                return obj;
            },
            notificationServices: function() {
                return ctrl.notificationServices;
            }
        }
        });

        modalInstance.result.then(function (updatedNotifApp) {
              var Notificationservices = $resource('http://team.binary-studio.com/app/api/notificationservice/:id', {id: '@id'}, {'update': { method:'PUT' }});
              var notifapp = Notificationservices.update({id: updatedNotifApp._id}, updatedNotifApp);
          });
    };
});