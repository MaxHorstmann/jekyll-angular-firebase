jafApp.controller('notesController', ["$scope", "$firebase", 'firebaseConnection',
  function ($scope, $firebase, firebaseConnection) {

    // subscript to user, only show write UI if authenticated
    $scope.$watch(function() { return firebaseConnection.user; }, function(user) {
      $scope.user = user;
    });

    $scope.notes = ['first', 'second'];


}]);