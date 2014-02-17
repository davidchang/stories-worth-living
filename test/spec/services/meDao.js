'use strict';

describe('Service: meDao', function () {

  // load the service's module
  beforeEach(module('storiesWorthLivingApp'));

  // instantiate service
  var meDao;
  beforeEach(inject(function (_meDao_) {
    meDao = _meDao_;
  }));

  it('should do something', function () {
    expect(!!meDao).toBe(true);
  });

});
