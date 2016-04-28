App.controller('SourcesController', function($scope, $http, Api) {
  $scope.getSources = function(){
    $http.get(Api + '/sources.json').then(function successCallback(response) {
        console.log(response.data.sources);
        $scope.sources = response.data.sources;
    });
  };

  $scope.getSources();
});
