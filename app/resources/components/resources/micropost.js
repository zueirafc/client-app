App.factory('Micropost', function($resource, Api) {

    var resource = $resource(Api + '/microposts/:id.json', { id: '@id' },
	{
		update: { method: 'PUT' },
		query: { method: 'GET', isArray: false },
        deleted: { 
            url: Api + '/microposts/deleted', 
            method: 'GET', 
            isArray: false
        },
        banned: { 
            url: Api + '/microposts/banned', 
            method: 'GET', 
            isArray: false
        },
        active: { 
            url: Api + '/microposts/active', 
            method: 'GET', 
            isArray: false
        },
        reproved: { 
            url: Api + '/microposts/reproved', 
            method: 'GET', 
            isArray: false
        },
        pending: { 
            url: Api + '/microposts/pending', 
            method: 'GET', 
            isArray: false
        }
	});

    return resource;

});

/*

  # deleted: Quando eu vejo uma zueira que nao eh uma zueira na realidade
  # banned: Quando deu treta e alguem quer meu coro porque usei uma imagem prop.
  # active: As zueiras que serao exibidas lah
  # reproved: Zueiras que por algum motivo nao especificado sao reprovadas.
  # pending: Zueiras recentes que acabam de passar pelo crawler.
  associate_values deleted: 0, banned: 1, active: 2, reproved: 3, pending: 4

*/
