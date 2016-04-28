App.controller('LoginController', function($scope, $auth, $location, $rootScope) {
  $scope.form = {};

  $scope.login = function() {
    if($('form').form('is valid')){
      $auth.submitLogin($scope.form)
        .then(function(resp) {
          window.location.href = '/admin/#/approvals';
        })
        .catch(function(resp) {
          console.log(resp);
        });
    }
  };

  $rootScope.$on('auth:login-success', function(ev, user) {
      alert('Welcome');
  });

  $rootScope.$on('auth:login-error', function(ev, reason) {
      alert('auth failed because ' + reason.errors[0]);
  });

  $scope.load = function() {
    $('.ui.form')
      .form({
        fields: {
          email: {
            identifier  : 'email',
            rules: [
              {
                type   : 'email',
                prompt : 'Humm, seu email é inválido, verifica aí!'
              }
            ]
          },
          password: {
            identifier  : 'password',
            rules: [
              {
                type   : 'empty',
                prompt : 'hey hey, coloque sua senha!'
              }
            ]
          }
        }
      });
  }

  // $scope.load();
});
