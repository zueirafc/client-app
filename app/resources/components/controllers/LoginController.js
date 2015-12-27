App.controller('LoginController', function($scope, $auth) {

	$scope.form = {};

	$scope.login = function() {
	  $auth.submitLogin($scope.form)
	    .then(function(resp) {
	      // handle success response
				alert('logado com SUCESSO!');
	    })
	    .catch(function(resp) {
	      alert('não deu!')
	    });
	};

});
//
//
// angular.module('App')
//   .controller('LoginController', function($scope, $auth) {
//     $scope.handleLoginBtnClick = function() {
//       $auth.submitLogin($scope.loginForm)
//         .then(function(resp) {
//           // handle success response
//         })
//         .catch(function(resp) {
//           // handle error response
//         });
//     };
//   });
