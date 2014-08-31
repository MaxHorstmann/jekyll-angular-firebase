var jafApp = angular.module('jafApp', ['firebase'],
	function($interpolateProvider) {
	    $interpolateProvider.startSymbol('[[{').endSymbol('}]]');
	});

jafApp.factory('firebaseConnection', ['$firebase', function($firebase) {
    var firebase_url = document.getElementById('data-firebase-url').getAttribute('data-firebase-url');
    var firebaseRef = new Firebase(firebase_url);
    return { 
      firebase_url : firebase_url, 
      firebaseRef : firebaseRef,
      user : {}
    };
}]);

jafApp.controller('authController', ['$scope', 'firebaseConnection', function($scope, firebaseConnection) {
    $scope.user = {};    
    var firebaseAuthClient = new FirebaseSimpleLogin(firebaseConnection.firebaseRef, function(error, user) {
      if (error) {
        alert(error);
      } else if (user) {
        $scope.user = user;        
      } else {
        $scope.user = { };
      }
      firebaseConnection.user = user;
      $scope.$apply();
    });

    $scope.login = function() {
      firebaseAuthClient.login('password', { email: 'testuser@example.com',  password: 'password' });
    };

    $scope.logout = function() {
      firebaseAuthClient.logout();;
    };
}]);
