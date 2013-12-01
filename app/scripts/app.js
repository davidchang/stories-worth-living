'use strict';

angular.module('storiesWorthLivingApp', ['ngRoute', 'akoenig.deckgrid', 'firebase', 'facebookUtils', 'infinite-scroll'])
  .value('facebookConfigSettings', {
    'firebaseURL'    : 'https://davidchang.firebaseio.com/stories-worth-living',
    'permissions'    : 'user_photos',
    'routingEnabled' : true,
    'loginPath'      : '/'
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl : 'views/main.html',
        controller  : 'MainCtrl'
      })
      .when('/create', {
        templateUrl : 'views/create.html',
        controller  : 'CreateCtrl',
        needAuth    : true
      })
      .otherwise({
        redirectTo : '/'
      });
  });