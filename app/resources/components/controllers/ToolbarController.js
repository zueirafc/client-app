App.controller('ToolbarController', function($scope, $location, $http, Api) {
  var template = 'components/partials/toolbar/_logged.html';
  var isAdmin = $location.absUrl().indexOf('/admin/') > -1;

  if(isAdmin)
    template = 'components/partials/toolbar/_admin.html';

  $scope.templateUrl = template;

  $scope.getClubs = function(){
    $http.get(Api + '/clubs.json').then(function successCallback(response) {
        $scope.clubs = response.data.clubs;
    });
  };

  $scope.getNicks = function(){
    $http.get(Api + '/nickname_fans.json').then(function successCallback(response) {
        $scope.nickname_fans = response.data.nickname_fans;
    });
  };

  $scope.getClubs();

  if(!isAdmin)
    $scope.getNicks();
});
