'use strict';

// Defining Angular app model with all other dependent modules
var App = angular.module('App', ['ui.router', 'ngResource', 'infinite-scroll', 'ng-token-auth']);

App.constant("Api", 'http://localhost:3000/v1');
// App.constant("Api", 'http://api.zueirafc.com/v1');

App.config(function($authProvider, Api) {
    $authProvider.configure({
      apiUrl: Api,
      validateOnPageLoad: true
    });
});

App.config(function($stateProvider) {
    $stateProvider
      // this state will be visible to everyone
      .state('root', {
        url: '',
        views: {
          'container': {
            templateUrl: 'components/views/home.html',
            controller: 'HomeController'
          }
        }
      })
      .state('login', {
        url: '/login',
        views: {
          'container': {
            templateUrl: 'components/views/login.html',
            controller: 'LoginController'
          }
        }
      })
      .state('admin', {
        url: '/admin  ',
        abstract: true,
        template: '<ui-view/>',
        resolve: {
          auth: function ($auth, $location) {
                    return $auth.validateUser().catch(function(err){
                        console.info('not authenticated', err);
                        $location.path('/login');
                    });
                }
        }
      })
      .state('admin.approvals', {
        url: '/approvals',
        templateUrl: 'components/views/admin/approvals.html',
        controller: 'ApprovalsController'
      });
     });

// // normal paths
// $routeProvider.when('/', {
//     templateUrl: 'components/views/home.html',
//     controller: 'HomeController',
//     needAuth: false
// });

// // auth paths
// $routeProvider.when('/login', {
//     templateUrl: 'components/views/login.html',
//     controller: 'LoginController',
//     needAuth: false
// }).when('/registro/:token/novo', {
//     templateUrl: 'components/views/register.html',
//     controller: 'RegisterController',
//     needAuth: false
// });

// $routeProvider.when('/approvals', {
//     templateUrl: 'components/views/admin/approvals.html',
//     controller: 'ApprovalsController',
//     needAuth: true
// });

// $routeProvider.otherwise({
//     templateUrl: 'components/views/404.html',
//     needAuth: false
// });

App.config(function($locationProvider, $httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

App.run(function($http, $rootScope, $auth) {
  // process.env.API_AUTH_TOKEN
  $http.defaults.headers.common.Authorization = 'Token token=5da9ba35945eaa739ff25784a556b48b126108e208a34c5bc2662506fd90fab6';

  $rootScope.$on('auth:validation-error', function (ev, error) {
      //i don't really use alert() but you get the idea
      alert('You need to be logged in!');
      // here you might want to redirect a user
      $state.go('login');
  });
});
