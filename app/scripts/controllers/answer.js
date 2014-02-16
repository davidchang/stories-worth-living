'use strict';

angular.module('storiesWorthLivingApp')
  .controller('AnswerCtrl', [
    '$rootScope',
    '$scope',
    'Db',
    function ($rootScope, $scope, Db) {

      /* Questions */

      // This needs to take into consideration how often the question can be asked.
      // If they can only answer it every day, then they need to be able to come back and answer this once a day
      var reconcileQuestionsWithAnswers = function() {

        if (!$scope.questions || !answeredQuestions) {
          return;
        }
        var today = new Date();
        var curQuestion = $scope.questions[$scope.questionIndex];
        $scope.questions = _.filter($scope.questions, function(question) {
          if (!answeredQuestions[question.key]) {
            return true;
          }

          return daysInBetween(today, answeredQuestions[question.key].date) > question.interval;
        });

        var index = _.indexOf($scope.questions, curQuestion);
        $scope.questionIndex = index > -1 ? index : 0;
      };

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
        text : 'Type your answer here...'
      };

      var answeredQuestions = {};

      $scope.userAnswers = { $add : angular.noop };
      $rootScope.loggedInPromise.then(function() {
        var db = Db.get('users/' + $rootScope.loggedInUser.id + '/answers');
        db.ref.on('child_added', function(snapshot) {
          // should capture only the most recent answer for that question
          var val = snapshot.val();

          answeredQuestions[val.questionId] = {
            date : new Date(val.date)
          };
          reconcileQuestionsWithAnswers();
        });
        $scope.userAnswers = db.conn;
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
        $scope.next();
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