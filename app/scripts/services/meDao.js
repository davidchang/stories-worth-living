'use strict';

angular.module('storiesWorthLivingApp')
  .service('Medao', [
    'Db',
    '$rootScope',
    '$firebase',
    function Medao(Db, $rootScope, $firebase) {

      var User = function(id) {
        this.id = id;
        this.db = Db.get('users/' + id);
      };

      User.prototype.setId = function(id) {
        this.id = id;
        this.db = Db.get('users/' + id);
      };

      User.prototype.destroyId = function() {
        this.id = null;
        this.db = null;
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

      return new User();
    }
  ]
);
