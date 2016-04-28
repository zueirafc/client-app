App.controller('LoginController', function($scope, $auth, $location, $rootScope, IsLogged) {
  $scope.form = {};

  $scope.login = function() {
    if($('form').form('is valid')){
      $auth.submitLogin($scope.form)
        .then(function(resp) {
          IsLogged = true;
          window.location.href = '/admin/#/approvals';
        })
        .catch(function(resp) {
          IsLogged = false;
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


  $rootScope.$on('auth:validation-success', function(ev, user) {
    alert('sucesso');
    IsLogged = true;
    alert("IsLogged: " + IsLogged);
  });

  $rootScope.$on('auth:validation-error', function(ev, user) {
    alert('error');
    IsLogged = false;
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
