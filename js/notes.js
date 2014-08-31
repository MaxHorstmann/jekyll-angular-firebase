jafApp.controller('notesController', ["$scope", "$firebase", 'firebaseConnection',
  function ($scope, $firebase, firebaseConnection) {

    // subscript to user, only show write UI if authenticated
    $scope.$watch(function() { return firebaseConnection.user; }, function(user) {
      $scope.user = user;
    });

    $scope.notes = $firebase(new Firebase(firebaseConnection.firebase_url + '/notes')).$asArray();
    $scope.newNote = '';

    var firebaseNoteIdSequenceRef = new Firebase(firebaseConnection.firebase_url + '/NoteIdSequence');
    $scope.addNote = function() {     
      firebaseNoteIdSequenceRef.transaction(function(id) {
        return id+1;
      }, function(error, committed, snapshot) {
        if (committed) {
          $scope.notes.$add({ id: snapshot.val(), text: $scope.newNote });
          $scope.newNote = '';
        }
      });
    };

    $scope.removeNote = function(id) {
      for(var i = 0; i<$scope.notes.length; i++){
      if ($scope.notes[i].id == id) $scope.notes.$remove(i);
    }};


}]);