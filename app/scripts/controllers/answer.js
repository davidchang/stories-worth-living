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

      Db.getRef('questions').on('child_added', function(snapshot) {
        var val = snapshot.val();
        val.key = snapshot.name();
        $scope.questions.push(val);

        reconcileQuestionsWithAnswers();

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

      var answeredQuestions = [];

      $scope.userAnswers = { $add : angular.noop };
      $rootScope.loggedInPromise.then(function() {
        var db = Db.get('users/' + $rootScope.loggedInUser.id + '/answers');
        db.ref.on('child_added', function(snapshot) {
          answeredQuestions.push(snapshot.val().questionId);

          reconcileQuestionsWithAnswers();
        });
        $scope.userAnswers = db.conn;
      });

      $scope.submit = function() {
        $scope.userAnswers.$add({
          text : $scope.answer.text,
          date : new Date(),
          isPrivate : $scope.answer.isPrivate,
          questionId : $scope.questions[$scope.questionIndex].key,
          questionText : $scope.questions[$scope.questionIndex].text
        });

        $scope.answer.text = '';
        $scope.next();
      };
      /* End Answers */


      // This needs to take into consideration how often the question can be asked.
      // If they can only answer it every day, then they need to be able to come back and answer this once a day
      var reconcileQuestionsWithAnswers = function() {
        if (!$scope.questions || !answeredQuestions) {
          return;
        }

        var curQuestion = $scope.questions[$scope.questionIndex];
        $scope.questions = _.filter($scope.questions, function(question) {
          return !_.contains(answeredQuestions, question.key);
        });

        var index = _.indexOf($scope.questions, curQuestion);
        $scope.questionIndex = index > -1 ? index : 0;
      };

    }
  ]
);