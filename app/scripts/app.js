'use strict';

angular.module('storiesWorthLivingApp', ['ngRoute', 'firebase', 'contenteditable'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl : 'views/main.html',
        controller  : 'MainCtrl'
      })
      .when('/answer', {
        templateUrl : 'views/answer.html',
        controller  : 'AnswerCtrl',
        private     : true
      })
      .when('/admin/questions', {
        templateUrl : 'views/admin/questions.html',
        controller  : 'AdminQuestionsCtrl',
        private     : true
      })
      .when('/user/:id?', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
      })
      .when('/me', {
        templateUrl: 'views/me.html',
        controller: 'MeCtrl',
        private     : true
      })
      .otherwise({
        redirectTo : '/'
      });
  });