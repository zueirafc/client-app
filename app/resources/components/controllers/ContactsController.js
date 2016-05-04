App.controller('ContactsController', function($scope, ContactCategoryFactory, ContactFactory) {
  $scope.contact = new ContactFactory();

  $scope.save = function(){
    ContactFactory.save($scope.contact, function() {

    });
  };

  ContactCategoryFactory.query(function (data){
    $scope.categories = data.contact_categories;
  });

  // $scope.sendContact = function(status, id) {
    // SourceFactory.update({ id: id, }, { source: { status: status } });
  // };
});
