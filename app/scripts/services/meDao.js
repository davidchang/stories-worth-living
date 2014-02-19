'use strict';

angular.module('storiesWorthLivingApp')
  .service('Medao', [
    'Db',
    '$rootScope',
    '$q',
    '$firebase',
    function Medao(Db, $rootScope, $q, $firebase) {

      var User = function(id) {
        this.id = id;
        this.db = Db.get('users/' + id);
      };

      User.prototype.getAnswers = function() {
        return $firebase(this.db.ref.child('/answers'));
      };

      User.prototype.getUsersFollowing = function() {
        return $firebase(this.db.ref.child('/following'));
      };

      User.prototype.getFollowers = function() {
        return $firebase(this.db.ref.child('/followers'));
      };

      User.prototype.getFriends = function() {
        return $firebase(this.db.ref.child('/friends'));
      };

      var deferred = $q.defer();

      $rootScope.loggedInPromise.then(function() {
        deferred.resolve(new User($rootScope.loggedInUser.id));
      }, function() {
        deferred.reject();
      });

      return deferred.promise;
    }
  ]
);
