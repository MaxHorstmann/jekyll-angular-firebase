var jafApp = angular.module('jafApp', ['firebase'],
	function($interpolateProvider) {
	    $interpolateProvider.startSymbol('[[{').endSymbol('}]]');
	});


jafApp.controller('jafController', ["$scope", "$firebase", function ($scope, $firebase) {

	var firebase_url = document.getElementById('data-firebase-url').getAttribute('data-firebase-url');
	var sync = $firebase(new Firebase(firebase_url));

  	var syncObject = sync.$asObject();
  	syncObject.$bindTo($scope, "data");

  	$scope.addCustomer = function() {
  		if (!$scope.data) $scope.data = {};
  		if (!$scope.data.customers) $scope.data.customers = [];

  		$scope.data.customers.push({ id: Math.floor((Math.random() * 100) + 1), name: 'john' });
  	};

  	$scope.removeCustomer = function(id) {
  		for(var i = 0; i<$scope.data.customers.length; i++){
			if ($scope.data.customers[i].id == id) $scope.data.customers.splice(i, 1);
		}
  	}

}]);