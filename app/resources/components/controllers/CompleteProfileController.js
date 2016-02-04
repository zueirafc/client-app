App.controller('CompleteProfileController', function($scope) {

  $scope.initialize = function() {
  	$('.profile-image .image').dimmer({ on: 'hover' });
  }

  $scope.initialize();
});
