angular.module('starter.controllers', [])

.controller('TodoListController', ["$scope", "NoteStore", function($scope, NoteStore) {
  $scope.notes = NoteStore.list();
  $scope.remove = function(noteId) {
    NoteStore.remove(noteId);
  };
}])

.controller('EditListController', ["$scope", "NoteStore", "$state", "$stateParams", function($scope, NoteStore, $state, $stateParams) {


  var ID = $stateParams.noteId;
  $scope.note = angular.copy(NoteStore.get(ID));

  $scope.save = function() {
    NoteStore.update($scope.note);
    $state.go('app.todolist')
  };


}])

.controller('AddListController', ["$scope", "$state", "NoteStore", function($scope, $state, NoteStore) {
  $scope.note = {
    id: new Date().getTime().toString(),
    title: '',
    description: ''
  };

  $scope.save = function() {
    NoteStore.create($scope.note);
    $state.go('app.todolist')
  };
}])



.controller('ListController', ["$scope", "$http", "$state", "$stateParams",  "$ionicHistory", function($scope, $http, $state, $stateParams, $ionicHistory) {

  $scope.data = {
    hideImage: true,
    showReorder: false
  }

  $http.get('js/clinical.json', {
      cache: true
    })
    .success(function(data) {
      if (data.clinical) {
        $scope.clinicals = data.clinical;
      }
    });

  $http.get('js/department.json', {
      cache: true
    })
    .success(function(data) {
      if (data.department) {
        $scope.department = data.department;
      }
    });

  $scope.whichCondition = $stateParams.aId;
}]);
