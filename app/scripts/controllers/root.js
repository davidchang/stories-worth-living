'use strict';

angular.module('storiesWorthLivingApp')
  .controller('RootCtrl', [
    '$rootScope',
    'facebookSDK',
    '$location',
    '$scope',
    '$timeout',
    function ($rootScope, facebookSDK, $location, $scope, $timeout) {

      $rootScope.$on('fbLoginSuccess', function(name, response) {
        $timeout(function() {
          $location.path('/create');
        });

        return;

        facebookSDK.api('/me').then(function(response) {
          $rootScope.loggedInUser = response;

          $location.path('/create');
        });
      });

      $rootScope.$on('fbLogoutSuccess', function() {
        $scope.$apply(function() {
          $rootScope.loggedInUser = {};
          $location.path('/');
        });
      });
    }
  ]
);
