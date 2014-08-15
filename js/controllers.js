var jafApp = angular.module('jafApp', [],
	function($interpolateProvider) {
	    $interpolateProvider.startSymbol('[[{').endSymbol('}]]');
	});


jafApp.controller('jafController', function ($scope) {
  $scope.foos = ['foo', 'bar', 'foobar'];
});