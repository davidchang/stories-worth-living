'use strict';

angular.module('storiesWorthLivingApp')
  .service('Userdao', [
    'Db',
    '$rootScope',
    '$q',
    '$firebase',
    function Userdao(Db, $rootScope, $q, $firebase) {

      var User = function(id) {
        if (id) {
          this.id = id;
          this.db = Db.get('users/' + id);
        }
      };
      User.prototype.setId = function(id) {
        this.id = id;
        this.db = Db.get('users/' + id);
      };
      User.prototype.getAnswers = function() {
        return $firebase(this.db.ref.child('/answers'));
      };

      User.prototype.getUsersFollowing = function() {
        return $firebase(this.db.ref.child('/following'));
      };

      User.prototype.getFollowers = function(getRef) {
        return $firebase(this.db.ref.child('/followers'));
      };

      return new User();
    }
  ]
);
