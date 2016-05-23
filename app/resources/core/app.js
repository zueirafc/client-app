'use strict';

// Defining Angular app model with all other dependent modules
var App = angular.module('App', ['ngRoute', 'ngResource', 'ngSanitize', 'ngCookies', 'angularMoment',
                                 'infinite-scroll', 'ng-token-auth', 'oitozero.ngSweetAlert']);

// App.constant("Api", 'http://localhost:3000/v1');
App.constant("Api", 'https://api.zueirafc.com/v1');

App
  .config(function($authProvider, Api) {
    $authProvider.configure({
      apiUrl: Api,
      validateOnPageLoad: true
    });
  })
  .config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'components/views/home.html',
        controller: 'HomeController'
    }).when('/open-source', {
        templateUrl: 'components/views/home/open-source.html'
    }).when('/fontes', {
        templateUrl: 'components/views/home/sources.html',
        controller: 'SourcesController'
    }).when('/contato', {
        templateUrl: 'components/views/home/contact.html',
        controller: 'ContactsController'
    }).when('/login', {
        templateUrl: 'components/views/login.html',
        controller: 'LoginController'
    }).when('/registro/:token/novo', {
        templateUrl: 'components/views/register.html',
        controller: 'RegisterController'
    }).when('/approvals', {
        templateUrl: 'components/views/admin/approvals.html',
        controller: 'ApprovalsController',
        resolve: needsAuth()
    }).when('/dash', {
        templateUrl: 'components/views/admin/dash.html',
        controller: 'DashController',
        resolve: needsAuth()
    }).when('/sources', {
        templateUrl: 'components/views/admin/sources.html',
        controller: 'SourcesController',
        resolve: needsAuth()
    }).otherwise({
        templateUrl: 'components/views/404.html'
    });
});

App.run(function($rootScope, $location, $auth, SweetAlert, amMoment) {
  amMoment.changeLocale('pt-br');

  $rootScope.$on('auth:logout-success', function(ev) {
    SweetAlert.swal({
      title: "Até breve!",
      confirmButtonColor: "#db2828",
      confirmButtonText: "Continuar"
    }, function(){
      $location.path('/');
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
});
