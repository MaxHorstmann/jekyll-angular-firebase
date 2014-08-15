var jafApp = angular.module('jafApp', [],
	function($interpolateProvider) {
	    $interpolateProvider.startSymbol('$$$');
	    $interpolateProvider.endSymbol('$$$');
	});


jafApp.controller('jafController', function ($scope) {
  $scope.foos = ['foo', 'bar', 'foobar'];
});