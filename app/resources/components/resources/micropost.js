App.factory('App', function($resource, Api) {
    var Micropost = $resource(Api + '/microposts/:id.json', { id: '@id' }, {
      update: {
        method: 'PUT'
      }
    });

  Micropost.prototype.update = function(cb) {
    return Micropost.update({  // this line throws the error
      id: this.id
    }, angular.extend({}, this, {
      _id: undefined
    }), cb);
  };
});
