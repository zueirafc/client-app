App.controller('RegisterController', function($scope, $auth, $http, Api, $location, $routeParams) {
  $scope.token = $routeParams.token;
  $scope.form = { email: '', password: '', club_id: 0 };

  $scope.register = function() {
    // deve ser feito no validador do form de cadastro.

    if(checkToken($scope.token)) {
      $auth.submitRegistration({
        email:                 $scope.form.email,
        password:              $scope.form.password,
        password_confirmation: $scope.form.password,
        club_id:               $('#club_id').val()
      }).then(function(resp) {
        window.location.href = '/admin/#/';
      });
    } else {
      alert('Demorou demais!! O seu token é inválido ou expirou!')
    }
  };

  $scope.$on('auth:registration-email-success', function(ev, message) {
    alert("Tudo ok! Seja bem-vindo! " + message.email);
  });

  $scope.$on('auth:registration-email-error', function(ev, reason) {
    console.log(reason);
    alert("A sua tentativa de registro falhou, confira seus dados novamente! Cód: " + reason.errors);
});

  $scope.getClubs = function(){
    $http.get(Api + '/clubs.json')
    .then(function successCallback(response) {
      $scope.clubs = response.data.clubs;
    }, function errorCallback(response) {
      console.log(response.headers);
    });
  };

  $scope.load = function(){
    $.fn.form.settings.rules.checktoken = function(value) {
      var token = new Date(parseInt(value)), current = new Date();

      return token >= current;
    }

    $(document)
      .ready(function() {
        $('.ui.form')
          .form({
            fields: {
              email: {
                identifier  : 'email',
                rules: [
                  { type: 'email', prompt: 'Humm, seu email é inválido, verifica aí!' }
                ]
              },
              password: {
                identifier: 'password',
                rules: [
                  { type: 'empty', prompt: 'hey hey, coloque sua senha!' }
                ]
              },
              token: {
                identifier: 'token-field',
                rules: [
                  { type: 'checktoken', prompt: 'Demorou demais!! O seu token é inválido ou expirou!' }
                ]
              },
              club: {
                identifier: 'club_id',
                rules: [
                  { type: 'empty', prompt: 'Escolha o time que você defenderá com unhas e dentes!' }
                ]
              }
            }
          });
      });
  }

  function checkToken(value){
    var token = new Date(parseInt(value)), current = new Date();

    return token >= current;
  }

  $scope.getClubs();
  // $scope.load();
});
