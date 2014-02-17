'use strict';

angular.module('storiesWorthLivingApp')
  .controller('AnswerCtrl', [
    '$rootScope',
    '$scope',
    'Db',
    'Medao',
    function ($rootScope, $scope, Db, meDao) {

      /* Questions */

      // This needs to take into consideration how often the question can be asked.
      // If they can only answer it every day, then they need to be able to come back and answer this once a day
      var reconcileQuestionsWithAnswers = function() {

        $scope.questionIndex = 0;
        $scope.displayedQuestions = [];

        if (!$scope.questions || !answeredQuestions) {
          return;
        }

        var today = new Date();

        _.each($scope.questions.$getIndex(), function(key) {
          var question = $scope.questions[key];
          question.key = key;

          if (!answeredQuestions[key] || (daysInBetween(today, answeredQuestions[question.key].date) >= question.interval)) {
            $scope.displayedQuestions.push(question);
          }
        });
      };

      $scope.questions = Db.getConn('questions');
      $scope.questions.$on('loaded', function() {
        reconcileQuestionsWithAnswers();
        $scope.questions.$off('loaded');
      });


      $scope.nextQuestion = function() {
        $scope.questionIndex++;
      };
      /* End Questions */


      /* Answers */
      $scope.answer = {
        text : 'Type your answer here...'
      };

      var answeredQuestions = {};

      $scope.userAnswers = { $add : angular.noop };
      meDao.then(function(me) {
        $scope.userAnswers = me.getAnswers();
        $scope.userAnswers.$on('loaded', function() {
          _.each($scope.userAnswers.$getIndex(), function(key) {
            var answer = $scope.userAnswers[key];
            answeredQuestions[answer.questionId] = {
              date : new Date(answer.date)
            }
          });

          reconcileQuestionsWithAnswers();
          $scope.userAnswers.$off('loaded');
        });
      });

      $scope.submit = function(isPrivate) {
        $scope.userAnswers.$add({
          text : $scope.answer.text,
          date : new Date(),
          isPrivate : isPrivate,
          questionId : $scope.questions[$scope.questionIndex].key,
          questionText : $scope.questions[$scope.questionIndex].text
        });

        $scope.answer.text = '';
        $scope.nextQuestion();
      };
      /* End Answers */

      // http://stackoverflow.com/questions/1036742/date-difference-in-javascript-ignoring-time-of-day
      var daysInBetween = function(first, second) {
        // Copy date parts of the timestamps, discarding the time parts.
        var one = new Date(first.getFullYear(), first.getMonth(), first.getDate());
        var two = new Date(second.getFullYear(), second.getMonth(), second.getDate());

        // Do the math.
        var millisecondsPerDay = 1000 * 60 * 60 * 24;
        var millisBetween = two.getTime() - one.getTime();
        var days = millisBetween / millisecondsPerDay;

        // Round down.
        var val = Math.floor(Math.abs(days));
        return val;
      }

    }
  ]
);