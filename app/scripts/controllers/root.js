'use strict';

angular.module('storiesWorthLivingApp')
  .controller('RootCtrl', [
    '$rootScope',
    'facebookUser',
    '$location',
    '$scope',
    '$q',
    function ($rootScope, facebookUser, $location, $scope, $q) {

      var loggedInPromise;

      var recreatePromise = function() {
        loggedInPromise = $q.defer();
        $rootScope.loggedInPromise = loggedInPromise.promise;
      };

      recreatePromise();

      $rootScope.$on('fbLoginSuccess', function(name, response) {

        facebookUser.then(function(user) {
          user.api('/me').then(function(response) {
            $rootScope.loggedInUser = response;
            loggedInPromise.resolve();

            $location.path('/answer');
          });
        }, function() {
          loggedInPromise.reject();
        });
      });

      $rootScope.$on('fbLogoutSuccess', function() {
        $scope.$apply(function() {
          recreatePromise();

          $rootScope.loggedInUser = {};
          loggedInPromise.reject();

          $location.path('/');
        });
      });
    }
  ]
);
