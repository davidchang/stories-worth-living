'use strict';

describe('Filter: addTimeCards', function () {

  // load the filter's module
  beforeEach(module('storiesWorthLivingApp'));

  // initialize a new instance of the filter before each test
  var addTimeCards;
  beforeEach(inject(function ($filter) {
    addTimeCards = $filter('addTimeCards');
  }));

  it('should return the input prefixed with "addTimeCards filter:"', function () {
    var text = 'angularjs';
    expect(addTimeCards(text)).toBe('addTimeCards filter: ' + text);
  });

});
