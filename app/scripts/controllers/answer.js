'use strict';

angular.module('storiesWorthLivingApp')
  .controller('AnswerCtrl', [
    '$rootScope',
    '$scope',
    'Db',
    function ($rootScope, $scope, Db) {

      /* Questions */
      $scope.questionIndex = 0;
      $scope.questions = [];

      var questionsRef = Db.get('questions', true);
      questionsRef.on('child_added', function(snapshot) {
        var val = snapshot.val();
        val.key = snapshot.name();
        $scope.questions.push(val);

        if (!$scope.$$phase) {
          $scope.$apply();
        }
      });

      $scope.next = function() {
        $scope.questionIndex++;
      };
      /* End Questions */


      /* Answers */
      $scope.answer = {
        isPrivate : true
      };

      $scope.userAnswers = { $add : angular.noop };
      $rootScope.loggedInPromise.then(function() {
        $scope.userAnswers = Db.get('users/' + $rootScope.loggedInUser.id + '/answers');
      });

      $scope.submit = function() {
        $scope.userAnswers.$add({
          text : $scope.answer.text,
          date : new Date(),
          isPrivate : $scope.answer.isPrivate,
          questionId : $scope.questions[$scope.questionIndex].key
        });

        $scope.answer.text = '';
        $scope.next();
      };
      /* End Answers */

    }
  ]
);