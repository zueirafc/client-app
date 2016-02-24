App.factory('Micropost', function($resource, Api) {
  return $resource(Api + '/microposts/:id.json', { id: '@id' },
  {
    update: { method: 'PUT' },
    query: { method: 'GET', isArray: false }
  });

  // Micropost.prototype.update = function(cb) {
  //   return Micropost.update({  // this line throws the error
  //     id: this.id
  //   }, angular.extend({}, this, {
  //     _id: undefined
  //   }), cb);
  // };
});
