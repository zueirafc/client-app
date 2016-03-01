App.factory('Micropost', function($resource, Api) {
	return $resource(Api + '/microposts/:id.json', { id: '@id' },
	{
		update: { method: 'PUT' },
		query: { method: 'GET', isArray: false },
        pending: { 
            url: Api + '/microposts/pending', 
            method: 'GET', 
            isArray: false
        },
        active: { url: Api + '/microposts/active', method: 'GET', isArray: false }
	});
});
