'use strict';

angular.module('storiesWorthLivingApp')
  .controller('MeCtrl', [
    '$scope',
    'Medao',
    function ($scope, me) {

      $scope.answers = me.getAnswers();
      $scope.following = me.getUsersFollowing();

    }
  ]
);