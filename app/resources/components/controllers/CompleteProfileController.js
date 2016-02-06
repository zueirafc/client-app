App.controller('CompleteProfileController', function($scope, $auth, $http, Api) {

  $scope.form = {}

  $scope.initialize = function() {
  	$('.profile-image .image').dimmer({ on: 'hover' });
    $scope.form.image = $scope.form.image ? $scope.form.image : '/images/avatars/elyse.png';
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

  $scope.getClubs();
  $scope.initialize();
});
