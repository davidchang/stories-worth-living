'use strict';

angular.module('storiesWorthLivingApp')
  .controller('MeCtrl', [
    '$scope',
    'Medao',
    function ($scope, meDao) {

      meDao.then(function(me) {
        $scope.answers = me.getAnswers();
        $scope.following = me.getUsersFollowing();
      });

    }
  ]
);