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
		})
		// display that the user was not founded
		.error(function () {
			$scope.userNotFound = true;
		})
	};
});

function getStatistics($scope, $http, $dir)
{
	$scope.labels = [];
	$scope.series = [];
	$scope.data = [];
	$scope.dataCommit = [];
	$scope.dataAdd = [];
	$scope.repositoryNotFound = false;
	$scope.loadedMulti = false;
	$scope.loadedSimple = false;
	$http.get("https://api.github.com/repos/" + $dir + "/stats/contributors")
	.success(function (stats) 
	{	 
		// number of users in the repository
		var nbUsers = stats.length;
		if(nbUsers != 0)
		{
			// number of weeks in the repository
			var nbWeeks = stats[0].weeks.length;
			var commit = [];
			var add = [];
			for(var i = 0; i < nbUsers; i++){
			// push of the name of the author
			$scope.series.push(stats[i].author.login);
			commit = [];
			add = [];
			for(var j = 0; j < nbWeeks; j++){
				// push of the name of the week
				if (i == 0)
				{
					$scope.labels.push("Week " + j);
				}
				commit.push(stats[i].weeks[j].c);
				add.push(stats[i].weeks[j].a)
			}
			$scope.dataCommit.push(commit);
			$scope.dataAdd.push(add);
			}
			$scope.loadedMulti = true;
		}
		// only 1 contributor we draw only statistic about the language
		else
		{
			$http.get("https://api.github.com/repos/" + $dir + "/languages")
			.success(function (stats) 
			{
				$scope.property = stats;
				for(var language in $scope.property)
				{
					$scope.labels.push(language);
					$scope.data.push($scope.property[language]);
				}
				$scope.loadedSimple = true;
			})
		}
	})
	// wrong directory given display error and search.
	.error(function () {
		$scope.search = true;
		$scope.repositoryNotFound = true;
	})
}

tweb.controller('repositoryUrl', function($scope, $http, $routeParams){
	$usernameRepo = $routeParams.user + "/" + $routeParams.repository;
	$scope.search = false;
	getStatistics($scope, $http, $usernameRepo);
	
	$scope.onClick = function (points, evt) {
		console.log(points, evt);
	};
});

tweb.controller('repository', function($scope, $http){
	$scope.errorWrongURL = false;
	$scope.repository = "";
	$scope.search = true;
	// function to get repository infos
	$scope.getRepository = function () {
		$scope.repositoryNotFound = false;
		// check if the input begins with "https://github.com/"
		if (!$scope.repository.search("https://github.com/"))
		{
			// "https://github.com/ has 19 char so we take them out
			$usernameRepo = $scope.repository.substr(19);
			$scope.search = false;
			getStatistics($scope, $http, $usernameRepo);		
		}
		else
		{
			$scope.errorWrongURL = true;
		}
		
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
