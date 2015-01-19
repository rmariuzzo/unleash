'use strict';

/**
 * @ngdoc function
 * @name unleashApp.controller:SinglePathController
 * @description
 * # SinglePathController
 * View a single path
 */
angular.module('unleashApp')
  .controller('SinglePathController', function($scope, $q, fbutil, $timeout, $routeParams, userService) {
    // Todo: move functionality to services
    $scope.params = $routeParams;

    // Resolve username from the URL to a google ID stored in Firebase
    userService.getUserUid($routeParams.userId).then(function(uid) {
      // Pull user data
      $scope.currentPathOwner = fbutil.syncObject('users/' + uid);

      $scope.currentPathOwner.$loaded().then(function() {
        if ($scope.user && $scope.currentPathOwner.uid === $scope.user.uid) {
          $scope.currentPathOwner.isCurrentUser = true;
        }
      });

      // Pull cards by this user
      $scope.cards = fbutil.syncArray('users/' + uid + '/cards');
    }, function() {
      // No users found!
      $scope.pathNotFound = true;
    });

  });
