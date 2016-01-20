var tweb = angular.module('tweb', ['ngRoute', 'chart.js']);



tweb.controller('main', function($scope, $http){
	
	$scope.username = "";
	$scope.getGitInfo = function () {
		$scope.userNotFound = false;
		$scope.loaded = false;
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

// controller for getting informations about the user
tweb.controller('user', function($scope, $http){
	
	$scope.username = "";
	$scope.getUser = function () {
		$scope.userNotFound = false;
		$scope.repoNotFound = false;
		$scope.loadedUser = false;
		$scope.loadedRepos = false;
		// first request for getting info about the user
		$http.get("https://api.github.com/users/" + $scope.username)
		.success(function (data) {
			$scope.user = data;
			$scope.loadedUser = true;
			// second request for getting info about the repos of the user
			$http.get("https://api.github.com/users/" + $scope.username + "/repos")
			.success(function (data) {
				$scope.userrepo = data;
				$scope.loadedRepos = true;
			})
			.error(function () {
				$scope.repoNotFound = true;
			})
		})
		.error(function () {
			$scope.userNotFound = true;
		})
	};
});
tweb.controller('repositoryUrl', function($scope, $http, $routeParams){
	$scope.labels = [];
	$scope.series = [];
	$scope.dataCommit = [];
	$scope.dataDelete = [];
	$scope.dataAdd = [];
	$scope.repositoryNotFound = false;
	$scope.loaded = false;
	$usernameRepo = $routeParams.user + "/" + $routeParams.repository;
	console.log($usernameRepo);
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
		$scope.repositoryNotFound = true;
	})
	$scope.onClick = function (points, evt) {
		console.log(points, evt);
	};
});

tweb.controller('repository', function($scope, $http){
	$scope.labels = [];
	$scope.series = [];
	$scope.dataCommit = [];
	$scope.dataDelete = [];
	$scope.dataAdd = [];
	$scope.repository = "";
	
	// function to get repository infos
	$scope.getRepository = function () {
		$scope.repositoryNotFound = false;
		$scope.loaded = false;
		// search for the username + repository name in the url:
		$beginUsername = $scope.repository.search("//github.com/") + 13;
		$usernameRepo = $scope.repository.substr($beginUsername);
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
			 $scope.repositoryNotFound = true;
		  })
	};
	$scope.onClick = function (points, evt) {
		console.log(points, evt);
	};
});

// routing for easy navigation on the web application
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
				when('/repository/:user/:repository', {
                    templateUrl: 'res/html/repository.html',
                    controller: 'repositoryUrl'
				}).	
				when('/repository', {
                    templateUrl: 'res/html/repository.html',
                    controller: 'repository'
				});
}]);
