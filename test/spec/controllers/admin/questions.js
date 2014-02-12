'use strict';

describe('Controller: AdminQuestionsCtrl', function () {

  // load the controller's module
  beforeEach(module('storiesWorthLivingApp'));

  var AdminQuestionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminQuestionsCtrl = $controller('AdminQuestionsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
