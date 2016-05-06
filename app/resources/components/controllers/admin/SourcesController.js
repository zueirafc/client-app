App.controller('SourcesController', function($scope, $http, SourceFactory) {
  SourceFactory.query(function (data){
    $scope.sources = data.sources;
  });

  $scope.changeStatus = function(status, id) {
    SourceFactory.update({ id: id, }, { source: { status: status } });
  };
});
