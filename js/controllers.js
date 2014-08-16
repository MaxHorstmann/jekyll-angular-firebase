var jafApp = angular.module('jafApp', ['firebase'],
	function($interpolateProvider) {
	    $interpolateProvider.startSymbol('[[{').endSymbol('}]]');
	});


jafApp.controller('jafController', ["$scope", "$firebase", function ($scope, $firebase) {

	var firebase_url = document.getElementById('data-firebase-url').getAttribute('data-firebase-url');
	var sync = $firebase(new Firebase(firebase_url));

  	var syncObject = sync.$asObject();
  	syncObject.$bindTo($scope, "data");

}]);