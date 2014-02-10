'use strict';

angular.module('storiesWorthLivingApp')
  .controller('CreateCtrl', [
    '$scope',
    '$rootScope',
    '$firebase',
    'facebookUser',
    function ($scope, $rootScope, $firebase, facebookUser) {

      $rootScope.loggedInPromise.then(function() {
        var storiesRef = new Firebase(
          'https://davidchang.firebaseio.com/stories/' + $rootScope.loggedInUser.id
        );
        $scope.stories = $firebase(storiesRef);
      });

      $scope.addStory = function() {
        $scope.stories.$add({
          name : $scope.newStory,
          url  : encodeURIComponent($scope.newStory)
        });
        $scope.newStory = '';
      };

      $scope.clearAll = function() {
        $scope.stories.$remove();
      };
    }
  ]
);
