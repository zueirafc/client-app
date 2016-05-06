App.controller('ApprovalsController', function($scope, Micropost,Delete_Micropost, ZueiraAPI, MicropostParticipant, $http,$log , Micropost_Utils) {
	// deleted: 0, banned: 1, active: 2, reproved: 3, pending: 4

	$scope.api = new ZueiraAPI();
	$scope.typePost = 'pending';
	$scope.letterLimit = 85;

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

		$scope.micropostJson.micropost.trollers = Micropost_Utils.addTrollersAndTargets($scope.micropostJson.micropost,$scope.clubs_selection_trollers,'Club','trollerable','trollers');
		$scope.micropostJson.micropost.targets  = Micropost_Utils.addTrollersAndTargets($scope.micropostJson.micropost,$scope.clubs_selection_targets,'Club','targetable','targets');

		Micropost.update({ id:$scope.post.id }, $scope.micropostJson);

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
