'use strict';

describe('Service: userDao', function () {

  // load the service's module
  beforeEach(module('storiesWorthLivingApp'));

  // instantiate service
  var userDao;
  beforeEach(inject(function (_userDao_) {
    userDao = _userDao_;
  }));

  it('should do something', function () {
    expect(!!userDao).toBe(true);
  });

});
