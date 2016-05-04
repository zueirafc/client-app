App.factory('ContactFactory', function($resource, Api) {

  var resource = $resource(Api + '/contacts/:id.json', {}, {
    update: { method:'PUT' },
    query: { method: 'GET', isArray: false }
  });

  return resource;
});
