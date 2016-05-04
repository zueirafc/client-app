App.factory('ContactCategoryFactory', function($resource, Api) {

  var resource = $resource(Api + '/contact_categories/:id.json', {}, {
    update: { method:'PUT' },
    query: { method: 'GET', isArray: false }
  });

  return resource;
});
