App.controller('ApprovalsController', function($scope) {
  $scope.show = function(){
    $('.ui.modal').modal('show');
  };

  $scope.init = function(){
    $(function () {
      $('.ui.modal').modal({ blurring: true }).modal();
      $('.ui.dropdown').dropdown();
    });
  };

  $scope.init();
});
