App.controller('CompleteProfileController', function($scope, $auth, $http, Api, $location) {
  var reader = new FileReader();

  $scope.file_changed = function(element){
     $scope.$apply(function(scope) {
         var photofile = element.files[0];

         reader.onload = function(e) { };
         reader.readAsDataURL(photofile);
     });
   };

  $scope.initialize = function(){
    $('.profile-image .image').dimmer({ on: 'hover' });
    $scope.update_form = {
      club_id: null,
      username: $scope.user.username,
      image: ($scope.user.image ? $scope.user.image.url : '/images/avatars/elyse.png')
    }
  }

  $scope.getClubs = function(){
    $http.get(Api + '/clubs.json')
      .then(function successCallback(response) {
        $scope.clubs = response.data.clubs;
      }, function errorCallback(response) { });
  };

  $scope.update = function(obj){
    obj.club_id = $('#club_id').val()
    obj.image = ($("#upload-tag")[0].files ? reader.readAsDataURL($("#upload-tag")[0].files[0]) : null);

    $auth.updateAccount(obj)
    .then(function(resp) {
      $location.path('');
    }).catch(function(resp) {
      console.log(resp);
    });
  };

  $scope.getClubs();
});
