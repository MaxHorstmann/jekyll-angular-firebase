var jafApp = angular.module('jafApp', ['firebase'],
	function($interpolateProvider) {
	    $interpolateProvider.startSymbol('[[{').endSymbol('}]]');
	});


jafApp.controller('jafController', ["$scope", "$firebase", function ($scope, $firebase) {

  	var firebase_url = document.getElementById('data-firebase-url').getAttribute('data-firebase-url');

    var firebaseRef = new Firebase(firebase_url);

    $scope.user = {};
    $scope.filter = '';
    
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


  	$scope.customers = $firebase(new Firebase(firebase_url + '/customers')).$asArray();
    $scope.newCustomer = '';

    var firebaseCustomerIdSequenceRef = new Firebase(firebase_url + '/customerIdSequence');
  	$scope.addCustomer = function() {  		
      firebaseCustomerIdSequenceRef.transaction(function(id) {
        return id+1;
      }, function(error, committed, snapshot) {
        if (committed) {
          $scope.customers.$add({ id: snapshot.val(), name: $scope.newCustomer });
          $scope.newCustomer = '';
        }
      });
  	};

  	$scope.removeCustomer = function(id) {
  		for(var i = 0; i<$scope.customers.length; i++){
  		if ($scope.customers[i].id == id) $scope.customers.$remove(i);
  	}

  }

}]);