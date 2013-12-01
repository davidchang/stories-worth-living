'use strict';

angular.module('storiesWorthLivingApp')
  .controller('CreateCtrl', [
    '$scope', 'facebookSDK',
    function ($scope, facebookSDK) {

      $scope.photos = [];

      var nextParams = '';
      var inTransit = false;

      var handleResponse = function(response) {
        $scope.photos = $scope.photos.concat(
          _.map(response.data, function(cur) {
            return {
              // src: _.first(cur.images).source,
              src: cur.source,
              title: cur.name
            };
          })
        );

        nextParams = response.paging.next ?
          _.last(response.paging.next.split('?')) :
          undefined;

        inTransit = false;
      }

      inTransit = true;
      facebookSDK.api('/me/photos').then(handleResponse);

      $scope.loadMore = function() {
        if (inTransit || !nextParams) {
          return;
        }

        inTransit = true;
        facebookSDK.api('/me/photos?' + nextParams).then(handleResponse);
      };

    }
  ]
);
