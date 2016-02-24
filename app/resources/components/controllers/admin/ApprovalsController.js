App.controller('ApprovalsController', function($scope, Micropost) {
  $scope.open = function (post) {
    $scope.post = post;
    $('.ui.modal').modal('show');
  };

  $scope.init = function(){
    $(function () {
      $('.ui.modal').modal({ blurring: true }).modal();
      $('.ui.dropdown').dropdown();
    });

    Micropost.query(function(data){
      $scope.microposts = data.microposts;
    });
  };

  $scope.init();
});
