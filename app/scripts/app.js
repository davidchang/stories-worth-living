'use strict';

angular.module('storiesWorthLivingApp', ['ngRoute', 'firebase', 'facebookUtils', 'contenteditable'])
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
      .when('/answer', {
        templateUrl : 'views/answer.html',
        controller  : 'AnswerCtrl',
        needAuth    : true
      })
      .when('/admin/questions', {
        templateUrl : 'views/admin/questions.html',
        controller  : 'AdminQuestionsCtrl',
        needAuth    : true
      })
      .when('/user/:id?', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
      })
      .when('/me', {
        templateUrl: 'views/me.html',
        controller: 'MeCtrl',
        needAuth    : true
      })
      .otherwise({
        redirectTo : '/'
      });
  });