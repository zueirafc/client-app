App.controller('LoginController', function($scope, $auth, $location, $rootScope, SweetAlert) {
  $scope.form = {};

  $scope.login = function() {
    if($('form').form('is valid')){
      $auth.submitLogin($scope.form)
        .then(function(resp) {
          window.location.href = '/admin/#/approvals';
        });
    }
  };

  $rootScope.$on('auth:login-success', function(ev, user) {
    SweetAlert.swal({
      title: "Prepare-se, você vai entrar em campo!",
      text: "Está escutando a torcida, gritando teu nome?",
      type: "success",
      confirmButtonColor: "#21ba45",
      confirmButtonText: "Continuar"
    });
  });

  $rootScope.$on('auth:login-error', function(ev, reason) {
    SweetAlert.swal({
      title: "Ops, sua autenticação falhou!",
      text: reason.errors[0],
      type: "warning",
      confirmButtonColor: "#db2828",
      confirmButtonText: "Voltar"
    });
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
