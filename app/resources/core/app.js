'use strict';

// Defining Angular app model with all other dependent modules
var App = angular.module('App',['ngRoute',
	'App.home','App.about','App.login']);

App.config(function($routeProvider, $locationProvider, $httpProvider) {

	// Declaration of the default route if neither of the controllers
	// is supporting the request path
	$routeProvider.otherwise({ redirectTo: '/'});

	// Settings for http communications
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];

	// disabling # in Angular urls
	// $locationProvider.html5Mode({
	// 		enabled: true,
	//      requireBase: false
	// });
});
