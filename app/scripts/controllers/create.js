'use strict';

angular.module('storiesWorthLivingApp')
  .controller('CreateCtrl', [
    '$scope', 'facebookSDK',
    function ($scope, facebookSDK) {

      $scope.photos = [];

      facebookSDK.api('/me/photos').then(function(response) {

        $scope.photos = _.map(response.data, function(cur) {
          return {
            src: _.first(cur.images).source,
            title: cur.name
          };
        });
      });

    }
  ]
);
