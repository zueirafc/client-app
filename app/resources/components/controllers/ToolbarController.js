App.controller('ToolbarController', function($scope, $location, $http, Api) {
  var template = 'components/partials/toolbar/_logged.html';

  if($location.absUrl().indexOf('/admin/') > -1){
    template = 'components/partials/toolbar/_admin.html';
  }

  $scope.templateUrl = template;

  $scope.getClubs = function(){
    $http.get(Api + '/clubs.json').then(function successCallback(response) {
        $scope.clubs = response.data.clubs;
    });
  };

  $scope.getClubs();
});
