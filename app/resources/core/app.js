'use strict';

// Defining Angular app model with all other dependent modules
var App = angular.module('App', ['ngRoute', 'ngResource', 'infinite-scroll', 'ng-token-auth']);

App.constant("Api", 'http://localhost:3000/v1');
// App.constant("Api", 'http://api.zueirafc.com/v1');

App.config(function($routeProvider, $authProvider, Api) {
    // normal paths
    $routeProvider.when('/', {
        templateUrl: 'components/views/home.html',
        controller: 'HomeController'
    });

    // auth paths
    $routeProvider.when('/login', {
        templateUrl: 'components/views/login.html',
        controller: 'LoginController'
    }).when('/registro/:token/novo', {
        templateUrl: 'components/views/register.html',
        controller: 'RegisterController'
    });

    $routeProvider.when('/approvals', {
        templateUrl: 'components/views/admin/approvals.html',
        controller: 'ApprovalsController'
    });

    $routeProvider.otherwise({
        templateUrl: 'components/views/404.html'
    });

    $authProvider.configure({
      apiUrl: Api
    });
});

App.run(function($http) {
  // process.env.API_AUTH_TOKEN
  $http.defaults.headers.common.Authorization = 'Token token=5da9ba35945eaa739ff25784a556b48b126108e208a34c5bc2662506fd90fab6';

});

App.config(function($routeProvider, $locationProvider, $httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
