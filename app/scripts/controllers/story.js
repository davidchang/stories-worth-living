'use strict';

angular.module('storiesWorthLivingApp')
  .controller('StoryCtrl', [
    '$scope',
    '$rootScope',
    '$firebase',
    '$routeParams',
    '$timeout',
    function ($scope, $rootScope, $firebase, $routeParams, $timeout) {

      var storiesRef = new Firebase('https://davidchang.firebaseio.com/stories');

      $rootScope.loggedInPromise.then(function() {
        var answersRef = storiesRef.child($rootScope.loggedInUser.id + '/' + $routeParams.name);
        $scope.stories = $firebase(answersRef);
      });

      var questionBankRef = storiesRef.child('questions/' + $routeParams.name);
      $scope.questions = $firebase(questionBankRef);

      $timeout(function() {
        $scope.currentQuestion = $scope.questions[moment().format('YYYYMMDD')];
      });

      $scope.addStory = function() {
        $scope.stories.$add({
          text : $scope.newStory,
          date : new Date()
        });
        $scope.newStory = '';
      };

      $scope.clearAll = function() {
        $scope.stories.$remove();
      };

      $scope.switchQuestions = function() {
        var realQuestions = [];
        _.each($scope.questions, function(question) {
          if (!_.isFunction(question)) {
            realQuestions.push(question);
          }
        });

        $scope.currentQuestion = _.first(_.shuffle(realQuestions));
      };
    }
  ]
);
