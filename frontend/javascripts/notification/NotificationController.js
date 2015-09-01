var app = require('./app');

app.controller('NotificationController', NotificationController);

function NotificationController($resource, $cookies) {

	var vm = this;
    vm.myInterval = 5000;
    vm.noWrapSlides = false;
    vm.today = new Date();
    vm.dtStart = null;
    vm.dtEnd = null;
    vm.userObject = {};

    var serverUserId = $cookies.get('serverUID');

	vm.text = 'notifications';
	vm.notifications = [];
    vm.notificationServices = [];

    getUser();
    getNotificationServices();

    function getUser(){
        var User = $resource('http://team.binary-studio.com/profile/api/users/?serverUserId='+ serverUserId);
        var user = User.query(function(res){
            vm.userObject = res[0];
            getNotifications();
        }, function(err){
            console.log(err);
        });
    }

	function getNotifications(){
	    var Notifications = $resource('http://team.binary-studio.com/app/api/usernotification/'+ vm.userObject.id );
	   	var not = Notifications.query(function(res){
	   		vm.notifications = res;
            for(var i = 0; i<vm.notifications.length; i++){
                vm.notifications[i].time = new Date(vm.notifications[i].time);
            }
    	}, function(err){
	        console.log(err);
	    });
	}

    function getNotificationServices(){
        var NotificationServices = $resource('http://team.binary-studio.com/app/api/notificationService');
        var notserv = NotificationServices.query(function(res){
            vm.notificationServices = res;
        }, function(err){
            console.log(err);
        });
    }
    
    vm.serviceIncludes = [];
    
    vm.includeService = function(service) {
        var index = vm.serviceIncludes.indexOf(service.name);
        if (index > -1) {
            vm.serviceIncludes.splice(index, 1);
        } else {
            vm.serviceIncludes.push(service.name);
        }
    };
    
    vm.serviceFilter = function(notification) {
        if (vm.serviceIncludes.length > 0) {
            if (vm.serviceIncludes.indexOf(notification.serviceType) < 0)
                return;
        }
        return notification;
    };

    vm.dateFilter = function(notification){
        if(vm.dtStart === null || vm.dtEnd === null){
            return notification;
        }
        vm.dtEnd.setHours(23);
        vm.dtEnd.setMinutes(59);
        if(vm.dtStart <= notification.time && notification.time <= vm.dtEnd){
            return notification;
        }
        return;
    };

    vm.clear = function(){
        vm.dtStart = null;
        vm.dtEnd = null;
    };
    vm.status = {
        startOpened: false,
        endOpened: false
    };
    vm.openStart = function(){
        vm.status.startOpened = true;
    };
    vm.openEnd = function(){
        vm.status.endOpened = true;
    };
    vm.format = 'd MMMM yyyy';
    vm.dateOptions = {
        showWeeks: false,
        startingDay: 1
    };
}