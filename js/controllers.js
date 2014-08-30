var jafApp = angular.module('jafApp', ['firebase'],
	function($interpolateProvider) {
	    $interpolateProvider.startSymbol('[[{').endSymbol('}]]');
	});


jafApp.controller('jafController', ["$scope", "$firebase", function ($scope, $firebase) {

  	var firebase_url = document.getElementById('data-firebase-url').getAttribute('data-firebase-url');

    var firebaseRef = new Firebase(firebase_url);
    var firebaseCustomersRef = new Firebase(firebase_url + '/customers');

    $scope.user = {};
    
    var firebaseAuthClient = new FirebaseSimpleLogin(firebaseRef, function(error, user) {
      if (error) {
        alert(error);
      } else if (user) {
        $scope.user = user;
      } else {
        $scope.user = { };
      }
      $scope.$apply();
    });

    $scope.login = function() {
      firebaseAuthClient.login('password', { email: 'testuser@example.com',  password: 'password' });
    };

    $scope.logout = function() {
      firebaseAuthClient.logout();;
    };


  	var sync = $firebase(firebaseCustomersRef);

  	var syncObject = sync.$asArray();
  	//syncObject.$bindTo($scope, "customers");
  	$scope.customers = syncObject;
    $scope.newCustomer = '';


  	$scope.addCustomer = function() {  		
  		$scope.customers.$add({ id: Math.floor((Math.random() * 100) + 1), name: $scope.newCustomer });
      $scope.newCustomer = '';
  	};

  	$scope.removeCustomer = function(id) {
  		for(var i = 0; i<$scope.customers.length; i++){
  		if ($scope.customers[i].id == id) $scope.customers.$remove(i);
  	}

  }

}]);