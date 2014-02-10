'use strict';

angular.module('storiesWorthLivingApp', ['ngRoute', 'firebase', 'facebookUtils'])
  .constant('facebookConfigSettings', {
    'permissions'    : 'user_photos',
    'routingEnabled' : true,
    'loginPath'      : '/',
    'appID'          : '335763733225618'
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl : 'views/main.html',
        controller  : 'MainCtrl'
      })
      .when('/themes', {
        templateUrl : 'views/stories.html',
        controller  : 'StoriesCtrl',
        needAuth    : true
      })
      .when('/themes/:name', {
        templateUrl : 'views/story.html',
        controller  : 'StoryCtrl',
        needAuth    : true
      })
      .otherwise({
        redirectTo : '/'
      });
  });