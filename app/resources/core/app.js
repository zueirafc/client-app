'use strict';

// Defining Angular app model with all other dependent modules
var App = angular.module('App', ['ngRoute', 'ngResource', 'infinite-scroll', 'ng-token-auth']);

App.value("IsLogged", false);
App.constant("Api", 'http://localhost:3000/v1');
// App.constant("Api", 'http://api.zueirafc.com/v1');

App.config(function($routeProvider, $authProvider, Api) {
    // normal paths
    $routeProvider.when('/', {
        templateUrl: 'components/views/home.html',
        controller: 'HomeController',
        needAuth: false
    });

    // auth paths
    $routeProvider.when('/login', {
        templateUrl: 'components/views/login.html',
        controller: 'LoginController',
        needAuth: false
    }).when('/registro/:token/novo', {
        templateUrl: 'components/views/register.html',
        controller: 'RegisterController',
        needAuth: false
    });

    $routeProvider.when('/approvals', {
        templateUrl: 'components/views/admin/approvals.html',
        controller: 'ApprovalsController',
        needAuth: true
    });

    $routeProvider.otherwise({
        templateUrl: 'components/views/404.html',
        needAuth: false
    });

    $authProvider.configure({
      apiUrl: Api,
      validateOnPageLoad: true
    });
});


App.run(function($rootScope, $location, $auth, $http, IsLogged) {
  // process.env.API_AUTH_TOKEN
  $http.defaults.headers.common.Authorization = 'Token token=5da9ba35945eaa739ff25784a556b48b126108e208a34c5bc2662506fd90fab6';

  $rootScope.$on("$routeChangeStart", function(event, next, current) {
    console.log(next.templateUrl + " -- e está logado? " + IsLogged);
    if (next.needAuth && IsLogged == false) {
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
