App.factory('ZueiraAPI', function($http, Micropost, Api) {
  var ZueiraAPI = function() {
    this.items = [];
    this.busy = false;
    this.nextPageNumber = 1;
  };

  ZueiraAPI.prototype.nextPage = function() {
    if (this.busy) return;
    this.busy = true;

    Micropost.pending({page: this.nextPageNumber}, function(data){
      var items = data.microposts;

      for (var i = 0; i < items.length; i++) {
        this.items.push(items[i]);
      }

      this.nextPageNumber += 1;
      this.busy = false;
    }.bind(this));
  };

  return ZueiraAPI;
});


App.controller('ApprovalsController', function($scope, Micropost, ZueiraAPI, MicropostParticipant, $http) {
	// deleted: 0, banned: 1, active: 2, reproved: 3, pending: 4

	$scope.api = new ZueiraAPI();

	$scope.open = function (post) {
		$scope.post = post;

		$('.ui.modal').modal('show');
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

		$('.ui.modal').modal('hide');

	};

	$scope.reprove = function(){
		$scope.post.status = 3;


			$('.ui.modal').modal('hide');
	};

	$scope.remove = function(){
		$scope.post.status = 1;

		$('.ui.modal').modal('hide');
	
	};
	

	$scope.init();
});
