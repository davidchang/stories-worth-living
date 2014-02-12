'use strict';

angular.module('storiesWorthLivingApp')
  .service('Db', [
    '$firebase',
    function Db($firebase) {
      var storiesRef = new Firebase('https://davidchang.firebaseio.com/stories');

      return {
        get : function(path, passRef) {
          if (!path) {
            return passRef ? storiesRef : $firebase(storiesRef);
          }

          var ref = storiesRef.child(path);
          return passRef ? ref : $firebase(ref);
        }
      };
    }
  ]
);
