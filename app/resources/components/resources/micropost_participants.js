App.factory('MicropostParticipant', function($resource, Api) {
	return $resource(Api + '/micropost_participants/trollers.json', { },
	{
		query: { method: 'GET', isArray: false }
	});
});
