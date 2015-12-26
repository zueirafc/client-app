App.controller('ToolbarController', ['$scope', function($scope) {
	$scope.loggedIn = false;
	$scope.templateUrl = '';

  $scope.chooser = function(){
    if ($scope.loggedIn) {
      $scope.templateUrl = 'components/partials/toolbar/_logged.html';
    } else {
      $scope.templateUrl = 'components/partials/toolbar/_not_logged.html';
    }
  };

  $scope.chooser();
}]);
