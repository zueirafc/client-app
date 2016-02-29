App.controller('ToolbarController', function($scope, $location, $http, Api) {
  $scope.templateUrl = 'components/partials/toolbar/_logged.html';

  $scope.getClubs = function(){
    $http.get(Api + '/clubs.json').then(function successCallback(response) {
        $scope.clubs = response.data.clubs;
    });
  };

  $scope.getClubs();
});
