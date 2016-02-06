App.controller('LoginController', function($scope, $auth) {
	$scope.form = {};

	$scope.login = function() {
	  $auth.submitLogin($scope.form)
	    .then(function(resp) {
	      // handle success response
				alert('logado com SUCESSO!');
	    })
	    .catch(function(resp) {
				console.log(resp);
	      // alert('não deu!')
	    });
	};

	$scope.authenticate = function(provider) {
    $auth.authenticate(provider)
			.then(function(resp) {
				console.log(resp);
        $location.path('/');
      })
      .catch(function(resp) {
        console.log(resp);
      });
  };
});
