'use strict';

angular.module('storiesWorthLivingApp')
  .controller('MeCtrl', [
    '$rootScope',
    '$scope',
    'Db',
    function ($rootScope, $scope, Db) {

      $rootScope.loggedInPromise.then(function() {
        // fetch all answers
        $scope.answers = Db.getConn('users/' + $rootScope.loggedInUser.id + '/answers');
      });

    }
  ]
);