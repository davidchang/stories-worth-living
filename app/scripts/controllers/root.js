'use strict';

angular.module('storiesWorthLivingApp')
  .controller('RootCtrl', [
    '$location',
    '$scope',
    'Db',
    'Medao',
    function ($location, $scope, DB, me) {

      $scope.user = {};

      var auth = new FirebaseSimpleLogin(DB.getRef(), function(error, user) {
        if (error) {
          // an error occurred while attempting login
        } else if (user) {
          // user authenticated with Firebase
          $scope.user = user;

          $scope.$apply(function() {
            me.setId(user.id);
            $location.path('/answer');
          });
        } else {
          // user is logged out
          $location.path('/');
          me.destroyId();
        }
      });


      $scope.login = function() {
        auth.login('facebook', {
          rememberMe: true
          // scope: 'email,user_likes'
        });
      };

      $scope.logout = function() {
        auth.logout();
      };

    }
  ]
);
