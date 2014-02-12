'use strict';

angular.module('storiesWorthLivingApp')
  .controller('UserCtrl', [
    '$scope',
    'Db',
    '$routeParams',
    function ($scope, Db, $routeParams) {

      $scope.userId = $routeParams.id;

      // we should only fetch public answers
      $scope.answers = Db.getConn('users/' + $routeParams.id + '/answers');

    }
  ]
);