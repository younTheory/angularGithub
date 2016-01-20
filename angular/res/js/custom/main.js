var tweb = angular.module('tweb', ['ngRoute', 'chart.js']);



tweb.controller('main', function($scope, $http){
	
	$scope.username = "";
	$scope.getGitInfo = function () {
		$scope.userNotFound = false;
		$scope.loaded = false;
		console.log($scope.username);
		$http.get("https://api.github.com/users/" + $scope.username)
		  .success(function (data) {
			 $scope.user = data;
			 $scope.loaded = true;
		  })
		  .error(function () {
			 $scope.userNotFound = true;
		  })
	};
});

tweb.controller('user', function($scope, $http){
	
	$scope.username = "";
	$scope.getUser = function () {
		$scope.userNotFound = false;
		$scope.loaded = false;
		$http.get("https://api.github.com/users/" + $scope.username + "/repos")
		  .success(function (data) {
			 $scope.user = data;
			 $scope.loaded = true;
		  })
		  .error(function () {
			 $scope.userNotFound = true;
		  })
	};
});

tweb.controller('graph', function($scope, $http){
	$scope.labels = [];
	$scope.series = [];
	$scope.dataCommit = [];
	$scope.dataDelete = [];
	$scope.dataAdd = [];
	$scope.graph = "";
	$scope.getGraph = function () {
		$scope.graphNotFound = false;
		$scope.loaded = false;
		// search for the username + repository name in the url:
		$beginUsername = $scope.graph.search("//github.com/") + 13;
		$usernameRepo = $scope.graph.substr($beginUsername);
		$http.get("https://api.github.com/repos/" + $usernameRepo + "/stats/contributors")
		  .success(function (stats) {	 
			 // number of users in the repository
			 var nbUsers = stats.length;
			 // number of weeks in the repository
			 var nbWeeks = stats[0].weeks.length;
			 var commit = [];
			 var del = [];
			 var add = [];
			 for(var i = 0; i < nbUsers; i++){
				 // push of the name of the author
				 $scope.series.push(stats[i].author.login);
				 commit = [];
				 del = [];
				 add = [];
				 for(var j = 0; j < nbWeeks; j++){
					// push of the name of the week
					if (i == 0)
					{
						$scope.labels.push("Week " + j);
					}
					commit.push(stats[i].weeks[j].c);
					del.push(stats[i].weeks[j].d)
					add.push(stats[i].weeks[j].a)
				}
				$scope.dataCommit.push(commit);
				$scope.dataDelete.push(del);
				$scope.dataAdd.push(add);
			 }
			 $scope.loaded = true;
		  })
		  .error(function () {
			 $scope.graphNotFound = true;
		  })
	};
	$scope.onClick = function (points, evt) {
		console.log(points, evt);
	};
});
tweb.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: 'res/html/main.html',
                    controller: 'main'
                }).
				when('/user', {
                    templateUrl: 'res/html/user.html',
                    controller: 'user'
                }).
				when('/graph', {
                    templateUrl: 'res/html/graph.html',
                    controller: 'graph'
                });
}]);
