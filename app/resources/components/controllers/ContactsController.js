App.controller('ContactsController', function($scope, SweetAlert, ContactCategoryFactory, ContactFactory) {
  $scope.contact = new ContactFactory();

  $scope.save = function(){
    $scope.contact.contact_category_id = $('#contact_category_id').val();
    console.log($scope.contact);

    ContactFactory.save({ contact: $scope.contact },
      function() {
        SweetAlert.swal({
          title: "WOOW",
          text: "Obrigado pelo contato! Entraremos em contato em breve!",
          type: "success",
          confirmButtonColor: "#21ba45",
          confirmButtonText: "Continuar"
        }, function(){
          window.location.href = '/#/';
        });
      },
      function(){
        SweetAlert.swal({
          title: "Poutz!",
          text: "Obrigado pelo contato! Mas aconteceu um erro inesperado e não pudemos enviar!!",
          type: "error",
          confirmButtonColor: "#db2828",
          confirmButtonText: "Continuar"
        });
      });
  };

  ContactCategoryFactory.query(function (data){
    $scope.categories = data.contact_categories;
  });
});
