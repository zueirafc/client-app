'use strict';

// Defining Angular app model with all other dependent modules
var App = angular.module('App', ['ngRoute', 'ngResource', 'infinite-scroll', 'ng-token-auth']);

// App.constant("Api", 'http://localhost:3000/v1');
App.constant("Api", 'http://api.zueirafc.com/v1');

App.config(function($routeProvider, $authProvider, Api) {
    // normal paths
    $routeProvider.when('/', {
        templateUrl: 'components/views/home.html',
        controller: 'HomeController',
        needsAuth: false
    });

    // auth paths
    $routeProvider.when('/login', {
        templateUrl: 'components/views/login.html',
        controller: 'LoginController',
        needsAuth: false
    }).when('/registro/:token/novo', {
        templateUrl: 'components/views/register.html',
        controller: 'RegisterController',
        needsAuth: false
    });

    // admin
    $routeProvider.when('/approvals', {
        templateUrl: 'components/views/admin/approvals.html',
        controller: 'ApprovalsController',
        needsAuth: true
    }).when('/dash', {
        templateUrl: 'components/views/admin/dash.html',
        controller: 'DashController',
        needsAuth: true
    }).when('/sources', {
        templateUrl: 'components/views/admin/sources.html',
        controller: 'SourcesController',
        needsAuth: true
    });

    $routeProvider.otherwise({
        templateUrl: 'components/views/404.html',
        needsAuth: false
    });

    $authProvider.configure({
      apiUrl: Api,
      validateOnPageLoad: true
    });
});


App.run(function($rootScope, $location, $auth, $http) {
  // process.env.API_AUTH_TOKEN
  $http.defaults.headers.common.Authorization = 'Token token=5da9ba35945eaa739ff25784a556b48b126108e208a34c5bc2662506fd90fab6';

  $rootScope.$on('auth:validation-error', function (ev, error) {
    alert('You need to be logged in!');
  });

  $rootScope.$on('auth:logout-success', function(ev) {
    alert('goodbye');
  });

  $rootScope.$on('auth:logout-error', function(ev, reason) {
    alert('logout failed because ' + reason.errors[0]);
  });

  $rootScope.$on("$routeChangeStart", function(event, next, current) {
    if (next.needsAuth && $rootScope.user.signedIn) {
      window.location.href = '/auth/#/login';
    }
  });
});

App.config(function($httpProvider) {
  $httpProvider.interceptors.push(function($q, $location) {

    return {
      'responseError' : function(rejection) {
        if (rejection.status == 401 || rejection.status == 403) {
          console.log("error code: " + rejection.status);
          $location.path("/login");
        }
        return $q.reject(rejection);
      }
    };
  });
});

App.config(function($locationProvider, $httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
