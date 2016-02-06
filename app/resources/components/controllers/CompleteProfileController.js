App.controller('CompleteProfileController', function($scope, $auth, $http, Api, $rootScope, $location) {
  $scope.base_user = $rootScope.user;
  $scope.update_form = { };

  $scope.initialize = function() {
  	$('.profile-image .image').dimmer({ on: 'hover' });
    $scope.update_form.image = $scope.base_user.image ? $scope.base_user.image.url : '/images/avatars/elyse.png';
  }

  $scope.file_changed = function(element) {
     $scope.$apply(function(scope) {
         var photofile = element.files[0];
         var reader = new FileReader();

         reader.onload = function(e) { };
         reader.readAsDataURL(photofile);
     });
   };

  $scope.getClubs = function(){
    $http.get(Api + '/clubs.json')
      .then(function successCallback(response) {
        $scope.clubs = response.data.clubs;
      }, function errorCallback(response) {
   });
  };

  $scope.save = function(){
    $auth.updateAccount({
      username: $scope.update_form.username,
      image: $scope.update_form.image,
			club_id: $('#club_id').val()
    }).then(function(resp) {
      $location.path('#/');
    }).catch(function(resp) {
      console.log(resp);
    });
  };

  $scope.initialize();
  $scope.getClubs();
});
