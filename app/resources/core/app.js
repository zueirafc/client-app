'use strict';

// Defining Angular app model with all other dependent modules
var App = angular.module('App', ['ngRoute', 'ng-token-auth']);

App.constant("Api", 'https://zueira-fc.herokuapp.com/api/v1');
// App.constant("Api", 'http://localhost:3000/api/v1');

App.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'components/views/home.html',
        controller: 'HomeController'
    });

    $routeProvider.when('/login', {
        templateUrl: 'components/views/login.html',
        controller: 'LoginController'
    });

    $routeProvider.when('/registro', {
        templateUrl: 'components/views/register.html',
        controller: 'RegisterController'
    });

    $routeProvider.otherwise({
        templateUrl: 'components/views/404.html'
    });
});

App.config(function($authProvider, Api) {
  $authProvider.configure({
      apiUrl: Api
  });
});

App.config(function($routeProvider, $locationProvider, $httpProvider) {
	// $routeProvider.otherwise({ redirectTo: '/'});

	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
