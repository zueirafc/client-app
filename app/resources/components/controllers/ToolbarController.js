App.controller('ToolbarController', function($scope, $auth, $location) {
	$scope.templateUrl = '';

  $scope.chooser = function(){
		$scope.templateUrl = 'components/partials/toolbar/_admin.html';

		// if ($auth.validateUser()) {
    //   $scope.templateUrl = 'components/partials/toolbar/_logged.html';
    // } else {
    //   $scope.templateUrl = 'components/partials/toolbar/_not_logged.html';
    // }
  };

	$scope.logout = function(){
		$auth.signOut()
      .then(function(resp) {
        $location.path('/');
      })
      .catch(function(resp) {
				console.log(resp);
      });
	};

  $scope.chooser();
});
