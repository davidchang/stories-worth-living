'use strict';

angular.module('storiesWorthLivingApp')
  .controller('StoriesCtrl', [
    '$scope',
    '$rootScope',
    '$firebase',
    'facebookUser',
    function ($scope, $rootScope, $firebase, facebookUser) {

      var storiesRef = new Firebase('https://davidchang.firebaseio.com/stories');

      $rootScope.loggedInPromise.then(function() {
        var usersStoriesRef = storiesRef.child($rootScope.loggedInUser.id);
        $scope.stories = $firebase(usersStoriesRef);

        usersStoriesRef.on('child_added', function(snapshot) {
          var storyText = (snapshot.val() || {}).text;
          _.each($scope.predefinedThemes, function(theme) {
            if (theme.text === storyText) {
              theme.alreadyAdded = true;
            }
          });
        });
      });

      var predefinedThemesRef = storiesRef.child('predefinedThemes');
      $scope.predefinedThemes = $firebase(predefinedThemesRef);

      $scope.noSelectedThemes = function() {
        return !_.some($scope.predefinedThemes, function(theme) {
          return theme.selected;
        });
      };

      $scope.addPredefined = function() {
        _.each($scope.predefinedThemes, function(theme) {
          if (theme.selected) {
            theme.predefined = true;
            theme.alreadyAdded = true;
            $scope.stories.$add(theme);
          }
        });
      };

      $scope.addStory = function() {
        $scope.stories.$add({
          text : $scope.newStory,
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
