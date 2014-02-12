'use strict';

describe('Service: DB', function () {

  // load the service's module
  beforeEach(module('storiesWorthLivingApp'));

  // instantiate service
  var DB;
  beforeEach(inject(function (_DB_) {
    DB = _DB_;
  }));

  it('should do something', function () {
    expect(!!DB).toBe(true);
  });

});
