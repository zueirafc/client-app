App.controller('HomeController', function($scope) {
  $scope.load = function(){
    $('.ui.embed').embed();
    $('.profile img').dimmer({ on: 'hover' });
    $('.items .image img').visibility({
      type       : 'image',
      transition : 'fade in',
      duration   : 1000
    });

    window.onload = function() { Gifffer(); }
  };

  $scope.load();
});
