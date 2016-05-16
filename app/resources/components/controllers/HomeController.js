App.controller('HomeController', function($scope, Micropost, ZueiraAPI, MicropostParticipant, SweetAlert) {
  $scope.scrollTrigger = false;
  $scope.api = new ZueiraAPI();
  $scope.api.nextPage('active');

  $scope.openShareModal = function (post) {
    $scope.post = post;

    $('.ui.modal').modal({ detachable: false, observeChanges: true }).modal('show').modal('refresh');
  };

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


  // Share methods:
  $scope.shareFB = function(post){
    var url = post.provider_url ? post.provider_url : 'https://zueirafc.com';

    FB.ui({
      method: 'share',
      href: url,
    }, function(response){
      SweetAlert.swal({
        title: "The Zueira has been planted!",
        type: "success",
        confirmButtonColor: "#21ba45",
        confirmButtonText: "Continuar"
      });
    });
  }

  $scope.load();
});
