'use strict';

angular.module('storiesWorthLivingApp')
  .filter('addTimeCards', function () {
    return _.memoize(function (input) {
      var toReturn = [],
        lastTime = '',
        time = null;

      _.each(input, function(cur) {
        time = moment(cur.time).format('MMMM YYYY');

        if (time !== lastTime) {
          lastTime = time;
          toReturn.push({
            type : 'time-card',
            time : time
          });
        }

        toReturn.push(cur);
      });

      return toReturn;
    });
  });
