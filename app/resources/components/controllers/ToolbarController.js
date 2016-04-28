App.controller('ToolbarController', function($scope, $location, $http, Api, $auth) {
  var template = '';
  var isAdmin = $location.absUrl().indexOf('/admin/') > -1;

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

  $scope.signOut = function(){
    $auth.signOut()
      .then(function(resp) {
        window.location.href = '/#/';
      })
      .catch(function(resp) {
        console.log(resp);
      });
  };

  if(isAdmin){
    template = 'components/partials/toolbar/_admin.html';
    $scope.getClubs();
  } else {
    template = 'components/partials/toolbar/_logged.html';
    $scope.getNicks();
  }

  $scope.templateUrl = template;
});
