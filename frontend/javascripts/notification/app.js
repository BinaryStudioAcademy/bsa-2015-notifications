module.exports = angular.module('notifications', ['ngRoute', 'ngResource', 'ngAnimate', 'ui.bootstrap'])
	.config(['$routeProvider', '$resourceProvider', '$httpProvider', '$locationProvider',
		function($routeProvider, $resourceProvider, $httpProvider, $locationProvider) {
			$routeProvider
				.when('/', {
					templateUrl: './templates/notification/notification.html',
					controller: 'NotificationController',
					controllerAs: 'notificationCtrl'
				})
				.when('/settings', {
					templateUrl: './templates/notification/settings.html',
					controller: 'SettingsController',
					controllerAs: 'settingsCtrl'
				})
				.otherwise({
					redirectTo: '/'
				});
			$resourceProvider.defaults.stripTrailingSlashes = false;
		}
	]);