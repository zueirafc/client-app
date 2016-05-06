'use strict';

// Defining Angular app model with all other dependent modules
var App = angular.module('App', ['ngRoute', 'ngResource', 'ipCookie', 'infinite-scroll', 'ng-token-auth',
                                 'oitozero.ngSweetAlert']);

// App.constant("Api", 'http://localhost:3000/v1');
App.constant("Api", 'http://api.zueirafc.com/v1');

App.config(function($routeProvider, $authProvider, Api) {
    // normal paths
    $routeProvider.when('/', {
        templateUrl: 'components/views/home.html',
        controller: 'HomeController',
        needsAuth: false
    }).when('/open-source', {
        templateUrl: 'components/views/home/open-source.html',
        needsAuth: false
    }).when('/fontes', {
        templateUrl: 'components/views/home/sources.html',
        controller: 'SourcesController',
        needsAuth: false
    }).when('/contato', {
        templateUrl: 'components/views/home/contact.html',
        controller: 'ContactsController',
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

App.run(function($rootScope, $location, $auth, $http, SweetAlert) {
  $http.defaults.headers.common.Authorization = 'Token token=5da9ba35945eaa739ff25784a556b48b126108e208a34c5bc2662506fd90fab6';

  $rootScope.$on('auth:validation-error', function (ev, error) {
    SweetAlert.swal({
      title: "Problemas na verificação de identidade!",
      text: "Aparentemente não conseguimos identificar que você está logado!",
      type: "error",
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Continuar"
    });
  });

  $rootScope.$on('auth:logout-success', function(ev) {
    SweetAlert.swal({
      title: "Até breve!",
      confirmButtonColor: "#db2828",
      confirmButtonText: "Continuar"
    });
  });

  $rootScope.$on('auth:logout-error', function(ev, reason) {
    SweetAlert.swal({
      title: "Ops! Problemas impediram que você deslogasse!",
      confirmButtonColor: "#db2828",
      type: "error",
      confirmButtonText: "Ok"
    });
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
          window.location.href = '/auth/#/login';
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

// App.config(function($httpProvider) {
//   $httpProvider.interceptors.push(function() {
//     return {
//         response: function(config) {
           // set header
//           return config;
//         }
//     };
//   });
// });
