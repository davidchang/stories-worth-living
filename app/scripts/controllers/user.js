'use strict';

angular.module('storiesWorthLivingApp')
  .controller('UserCtrl', [
    '$scope',
    'Db',
    '$routeParams',
    '$rootScope',
    function ($scope, Db, $routeParams, $rootScope) {

      $scope.userId = $routeParams.id;

      // we should only fetch public answers
      $scope.answers = Db.getConn('users/' + $routeParams.id + '/answers');
      var userFollowers = Db.get('users/' + $routeParams.id + '/followers');
      $scope.userFollowers = userFollowers.conn;


      /* FOLLOWING FEATURE */
      $scope.myFollowers = [];
      if ($scope.userId) {
        var userFollowingRef;
        $rootScope.loggedInPromise.then(function() {
          var db = Db.get('users/' + $rootScope.loggedInUser.id + '/following');
          $scope.myFollowers = db.conn;
          userFollowingRef = db.ref;
        });

        $scope.isFollowing = function() {
          return _.contains($scope.myFollowers, $scope.userId);
        };

        $scope.toggleFollow = function() {

          if ($scope.isFollowing()) {

            var removeKey = function(array, lookingFor, dbRef) {
              var foundKey;
              _.each(array, function(val, key) {
                if (!foundKey && val === lookingFor) {
                  foundKey = key;
                }
              });

              dbRef.child(foundKey).remove();
            };

            removeKey($scope.myFollowers, $scope.userId, userFollowingRef);
            removeKey($scope.userFollowers, $rootScope.loggedInUser.id, userFollowers.ref);

          } else {
            $scope.myFollowers.$add($scope.userId);
            $scope.userFollowers.$add($rootScope.loggedInUser.id);
          }
        };
      }
      /* END FOLLOWING FEATURE */

    }
  ]
);