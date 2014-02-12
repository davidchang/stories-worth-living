'use strict';

angular.module('storiesWorthLivingApp')
  .service('Db', [
    '$firebase',
    function Db($firebase) {
      var storiesRef = new Firebase('https://davidchang.firebaseio.com/stories');

      return {
        get : function(path) {
          if (!path) {
            return $firebase(storiesRef);
          }

          var ref = storiesRef.child(path);
          return $firebase(ref);
        }
      };
    }
  ]
);
