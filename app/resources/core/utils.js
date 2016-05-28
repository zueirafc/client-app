function needsAuth(){
  return {
    auth: ['$auth', function($auth, $location) {
      return $auth.validateUser().catch(function(err){
        swal({
          title: "Problemas na verificação de identidade!",
          text: "Aparentemente não conseguimos identificar que você está logado!",
          type: "error",
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Continuar"
        }, function(){
          window.location.href = '/auth/#/login';
        });
      });
    }]
  }
}
