'use strict';

angular.module('storiesWorthLivingApp')
  .controller('AdminQuestionsCtrl', [
    '$scope',
    'Db',
    function ($scope, Db) {

      $scope.themes = Db.get('themes');

      $scope.addTheme = function() {
        $scope.themes.$add({
          text : $scope.newTheme
        });
        $scope.newTheme = '';
      };

      $scope.questions = Db.get('questions');

      $scope.addQuestion = function() {
        $scope.questions.$add($scope.newQuestion);
        $scope.newQuestion.text = '';
      };

    }
  ]
);
