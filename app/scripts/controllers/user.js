'use strict';

angular.module('storiesWorthLivingApp')
  .controller('UserCtrl', [
    '$scope',
    '$routeParams',
    '$rootScope',
    'Userdao',
    'Medao',
    'Db',
    '$timeout',
    function ($scope, $routeParams, $rootScope, userDao, meDao, Db, $timeout) {

      $scope.userId = $routeParams.id;
      userDao.setId($routeParams.id);

      // we should only fetch public answers
      $scope.answers = userDao.getAnswers();
      $scope.userFollowers = userDao.getFollowers();

      $scope.getFriendStatus = function() { return 'none'; };



      /* FOLLOWING FEATURE */
      $scope.myFollowers = [];
      if ($scope.userId) {
        meDao.then(function(me) {
          $scope.myFollowers = me.getUsersFollowing();
          $scope.myFriends = me.getFriends();

          $scope.isFollowing = function() {
            return _.contains($scope.myFollowers, $scope.userId);
          };

          $scope.toggleFollow = function() {

            if ($scope.isFollowing()) {

              Db.remove($scope.myFollowers, $scope.userId);
              Db.remove($scope.userFollowers, $rootScope.loggedInUser.id);

            } else {
              $scope.myFollowers.$add($scope.userId);
              $scope.userFollowers.$add($rootScope.loggedInUser.id);
            }
          };

          $scope.myAnswers = {};
          var myAnswers = me.getAnswers();
          myAnswers.$on('loaded', function() {
            _.each(myAnswers, function(answer) {
              // this should ideally only contain questions that the user hasn't answered already
              if (answer.questionId) {
                $scope.myAnswers[answer.questionId] = answer.questionText;
              }
            });
            myAnswers.$off('loaded');
          });

          $scope.answered = function(id) {
            return !_.isUndefined($scope.myAnswers[id]);
          };

          $scope.exchangeAnswers = function(answer) {
            userDao.addNotification({ type : 'answerExchange', questionId : answer.questionId });
          };

          $scope.askQuestion = function() {
            userDao.addNotification({ type : 'answerRequest', questionId : $scope.ask.question });
            $scope.ask.progress = true;

            $timeout(function() {
              $scope.ask.question = undefined;
              $scope.ask.progress = false;
            }, 3000);
          };

          $scope.getFriendStatus = function() {
            var match = _.findWhere($scope.myFriends, { userId : $scope.userId });
            if (!match) {
              return 'none';
            }
            return match.status;
          };

          $scope.friendAction = function() {
            var status = $scope.getFriendStatus();
            if (status === 'none') {
              // add to my friends
              $scope.myFriends.$add({
                userId : $scope.userId,
                status : 'pending',
                date : new Date()
              });

              //also add user notification
              userDao.addNotification({ type : 'friend' });

            } else if (status === 'accepted') {
              var matchingKey;
              _.each($scope.myFriends, function(friend, key) {
                if (friend.userId === $scope.userId) {
                  matchingKey = key;
                }
              });
              matchingKey && $scope.myFriends.$remove(matchingKey);
            }
          };
        });
      }
      /* END FOLLOWING FEATURE */

    }
  ]
);