angular.module('App').controller('LeftPanelController', function($scope, $http, Api) {
  $scope.getTargets = function(){
    $http.get(Api + '/targets/most_targeted.json').then(function successCallback(response) {
        $scope.targets = response.data.targets;
    });
  };

  $scope.getTargets();
});
