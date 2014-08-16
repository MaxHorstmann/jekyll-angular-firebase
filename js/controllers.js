var jafApp = angular.module('jafApp', ['firebase'],
	function($interpolateProvider) {
	    $interpolateProvider.startSymbol('[[{').endSymbol('}]]');
	});


jafApp.controller('jafController', ["$scope", "$firebase", function ($scope, $firebase) {

	var firebase_url = document.getElementById('data-firebase-url').getAttribute('data-firebase-url');
	var sync = $firebase(new Firebase(firebase_url));

  	var syncObject = sync.$asArray();
  	//syncObject.$bindTo($scope, "customers");
  	$scope.customers = syncObject;


  	$scope.addCustomer = function() {  		
  		//if (!$scope.data.customers) $scope.data.customers = [];
  		$scope.customers.$add({ id: Math.floor((Math.random() * 100) + 1), name: 'john' });
  	};

  	$scope.removeCustomer = function(id) {
  		for(var i = 0; i<$scope.customers.length; i++){
			if ($scope.customers[i].id == id) $scope.customers.$remove(i);
		}
  	}

}]);