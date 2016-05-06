App.factory('SourceFactory', function($resource, Api) {

  var resource = $resource(Api + '/sources/:id.json', {}, {
    update: { method:'PUT' },
    query: { method: 'GET', isArray: false }
  });

  return resource;
});
