jafApp.controller('customersController', ["$scope", "$firebase", 'firebaseConnection',
  function ($scope, $firebase, firebaseConnection) {

    // subscript to user, only show write UI if authenticated
    $scope.$watch(function() { return firebaseConnection.user; }, function(user) {
      $scope.user = user;
    });

    $scope.filter = '';

  	$scope.customers = $firebase(new Firebase(firebaseConnection.firebase_url + '/customers')).$asArray();
    $scope.newCustomer = '';

    var firebaseCustomerIdSequenceRef = new Firebase(firebaseConnection.firebase_url + '/customerIdSequence');
  	$scope.addCustomer = function() {  		
      firebaseCustomerIdSequenceRef.transaction(function(id) {
        return id+1;
      }, function(error, committed, snapshot) {
        if (committed) {
          $scope.customers.$add({ 
            id: snapshot.val(), 
            name: $scope.newCustomerName, 
            phone: $scope.newCustomerPhone, 
            email: $scope.newCustomerEmail });
          $scope.newCustomerName = '';
          $scope.newCustomerPhone = '';
          $scope.newCustomerEmail = '';          
        }
      });
  	};

  	$scope.removeCustomer = function(id) {
  		for(var i = 0; i<$scope.customers.length; i++){
  		if ($scope.customers[i].id == id) $scope.customers.$remove(i);
  	}

  }

}]);