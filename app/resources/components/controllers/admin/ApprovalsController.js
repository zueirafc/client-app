App.factory('ZueiraAPI', function($http, Micropost, Api,$log) {
  var ZueiraAPI = function() {
    this.items = [];
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


App.controller('ApprovalsController', function($scope, Micropost, ZueiraAPI, MicropostParticipant, $http,$log) {
	// deleted: 0, banned: 1, active: 2, reproved: 3, pending: 4

	$scope.api = new ZueiraAPI();
	$scope.typePost = 4;

	$scope.open = function (post) {
		$scope.post = post;

		$('.ui.modal').modal('show');
	};

	$scope.mudarTypePost = function (typePost) {
		$scope.typePost = typePost;
		$scope.api.items = [];
		$scope.api.nextPageNumber = 1;
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
    	
		Micropost.update({ id:$scope.post.id }, $scope.micropostJson);

		$('.ui.modal').modal('hide');

	};

	$scope.reprove = function(){
		$scope.post.status = 3;

		$scope.micropostJson = {
    		"micropost" :$scope.post
    	};

		Micropost.update({ id:$scope.post.id }, $scope.micropostJson);

		$('.ui.modal').modal('hide');
	};

	$scope.remove = function(){
		$scope.post.status = 1;

		$scope.micropostJson = {
    		"micropost" :$scope.post
    	};
    	
		Micropost.update({ id: $scope.post.id}, $scope.micropostJson);

		$('.ui.modal').modal('hide');
	
	};


	$scope.init();
});
