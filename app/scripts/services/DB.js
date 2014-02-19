'use strict';

angular.module('storiesWorthLivingApp')
  .service('Db', [
    '$firebase',
    function Db($firebase) {
      var storiesRef = new Firebase('https://davidchang.firebaseio.com/stories');

      return {
        getConn : function(path) {
          return this.get(path).conn;
        },
        getRef : function(path) {
          return this.get(path).ref;
        },
        get : function(path) {
          if (!path) {
            return { ref : storiesRef, conn : $firebase(storiesRef) };
          }

          var ref = storiesRef.child(path);
          return { ref : ref, conn : $firebase(ref) };
        },
        remove : function(dbRef, lookingFor) {
          var foundKey;
          _.each(dbRef.$getIndex(), function(key) {
            if (!foundKey && dbRef[key] === lookingFor) {
              foundKey = key;
            }
          });

          foundKey && dbRef.$remove(foundKey);
        },
        contains : function(dbRef, lookingFor) {
          return _.findWhere(dbRef, lookingFor);
        }
      };
    }
  ]
);
