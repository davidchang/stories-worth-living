'use strict';

angular.module('storiesWorthLivingApp')
  .controller('UserCtrl', [
    '$scope',
    '$routeParams',
    '$rootScope',
    'Userdao',
    'Medao',
    'Db',
    function ($scope, $routeParams, $rootScope, userDao, meDao, Db) {

      $scope.userId = $routeParams.id;
      userDao.setId($routeParams.id);

      // we should only fetch public answers
      $scope.answers = userDao.getAnswers();
      $scope.userFollowers = userDao.getFollowers();



      /* FOLLOWING FEATURE */
      $scope.myFollowers = [];
      if ($scope.userId) {
        meDao.then(function(me) {
          $scope.myFollowers = me.getUsersFollowing();

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
        });
      }
      /* END FOLLOWING FEATURE */

    }
  ]
);