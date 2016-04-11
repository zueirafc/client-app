App.factory('ZueiraAPI', function($http, Micropost, Api,$log) {
  
  var ZueiraAPI = function() {
    this.items = new Array();
    this.busy = false;
    this.nextPageNumber = 1;
  };

  ZueiraAPI.prototype.nextPage = function(typePost) {
    if (this.busy) return;
    this.busy = true;

	if(typePost == 0){

	    Micropost.deleted({page: this.nextPageNumber}, function(data){
	      items = data.microposts;
	      for (var i = 0; i < items.length; i++) {
	        this.items.push(items[i]);
	      }

	      this.nextPageNumber += 1;
	      this.busy = false;
	    }.bind(this));
	};


	if(typePost == 1){

	    Micropost.banned({page: this.nextPageNumber}, function(data){
	      items = data.microposts;
	      for (var i = 0; i < items.length; i++) {
	        this.items.push(items[i]);
	      }

	      this.nextPageNumber += 1;
	      this.busy = false;
	    }.bind(this));
	};

	if(typePost == 2){

	    Micropost.active({page: this.nextPageNumber}, function(data){
	      items = data.microposts;
	      for (var i = 0; i < items.length; i++) {
	        this.items.push(items[i]);
	      }

	      this.nextPageNumber += 1;
	      this.busy = false;
	    }.bind(this));
	};


	if(typePost == 3){

	    Micropost.reproved({page: this.nextPageNumber}, function(data){
	      items = data.microposts;
	      for (var i = 0; i < items.length; i++) {
	        this.items.push(items[i]);
	      }

	      this.nextPageNumber += 1;
	      this.busy = false;
	    }.bind(this));
	};

	if(typePost == 4){
	    Micropost.pending({page: this.nextPageNumber}, function(data){
	      var items = data.microposts;

	     
	      for (var i = 0; i < items.length; i++) {
	        this.items.push(items[i]);
	      }

	      this.nextPageNumber += 1;
	      this.busy = false;
	    }.bind(this));
	};


	};

  return ZueiraAPI;
});


App.controller('ApprovalsController', function($scope, Micropost,Delete_Micropost, ZueiraAPI, MicropostParticipant, $http,$log) {
	// deleted: 0, banned: 1, active: 2, reproved: 3, pending: 4

	$scope.api = new ZueiraAPI();
	$scope.typePost = 4;

	$scope.open = function (post) {
		$scope.post = post;

		$('.ui.modal').modal('show');
	};

	$scope.refreshTypePost = function (typePost) {
		$scope.typePost = typePost;
		$scope.api = new ZueiraAPI();
		$scope.api.nextPage($scope.typePost);
	};


	$scope.init = function(){
   		MicropostParticipant.query(function(data){
      		$scope.clubs = data.clubs;
   		});

		setTimeout(function() {
			$('.ui.modal').modal({ blurring: true }).modal();
			$('.ui.dropdown').dropdown();
			$('.ui.checkbox').checkbox();
		}, 3000);
	};

	$scope.approve = function(){
		$scope.post.status = 2;

		$scope.micropostJson = {
    		"micropost" :$scope.post
    	};

    	 var _timezueiro = $('.ui.fluid.multiple.search')
  				.search('behavior show results');


			$log.info(_timezueiro)


		Micropost.update({ id:$scope.post.id }, $scope.micropostJson);

		$('.ui.modal').modal('hide');
		$scope.refreshTypePost($scope.typePost);
	};

	$scope.reprove = function(){
		$scope.post.status = 3;

		$scope.micropostJson = {
    		"micropost" :$scope.post
    	};

		Micropost.update({ id:$scope.post.id }, $scope.micropostJson);

		$('.ui.modal').modal('hide');

		$scope.refreshTypePost($scope.typePost)


	};

	$scope.remove = function(){
		$scope.post.status = 1;

		$scope.micropostJson = {
    		"micropost" :$scope.post
    	};
    	
		Micropost.update({ id: $scope.post.id}, $scope.micropostJson);

		$('.ui.modal').modal('hide');

		$scope.refreshTypePost($scope.typePost)
	
	};

	$scope.deletePost = function(typePost){

		$scope.micropostJson = {
    		"micropost" :$scope.post
    	};
    	
		Micropost.delete({ id: $scope.post.id}, $scope.micropostJson);

		$('.ui.modal').modal('hide');

		$scope.refreshTypePost(typePost)
	
	};

	$scope.deleteSources = function(post,source,typePost){
		$scope.post = post;

		$scope.micropostJson = {
    		"micropost" :$scope.post
    	};
    	
		Delete_Micropost.delete({ micropost_id: $scope.post.id,id_medium :source }, $scope.micropostJson);

		$('.ui.modal').modal('hide');

		$scope.refreshTypePost($scope.typePost)
	
	};


	$scope.init();
});
