App.controller('LoginController', function($scope, $auth, $rootScope, $location) {
	$scope.form = {};

	$scope.login = function() {
	  $auth.submitLogin($scope.form)
	    .then(function(resp) {
				alert('logado com SUCESSO!');
	    })
	    .catch(function(resp) {
				console.log(resp);
	    });
	};

	$scope.authenticate = function(provider) {
    $auth.authenticate(provider)
			.then(function(resp) {
        $location.path('#/');
      })
      .catch(function(resp) {
        console.log(resp);
      });
  };

	$scope.$on('auth:oauth-registration', function(ev, user) {
		$rootScope.user = user;
		$location.path('/last-step');
	});
});
