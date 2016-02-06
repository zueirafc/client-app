App.controller('CompleteProfileController', function($scope, $auth, $http, Api, $rootScope) {
  $scope.form = $rootScope.user || { };

  $scope.initialize = function() {
  	$('.profile-image .image').dimmer({ on: 'hover' });
    $scope.form.image = $scope.form.image ? $scope.form.image.url : '/images/avatars/elyse.png';
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
    $scope.form.club_id = $('#club_id').val()
    $auth.updateAccount($scope.form)
      .then(function(resp) {
        $location.path('/');
      })
      .catch(function(resp) {
        console.log(resp);
      });
  }

  $scope.getClubs();
  $scope.initialize();
});
