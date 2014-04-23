'use strict';

describe('Customer controllers', function() {

  describe('CustomersCtrlGET', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(module('customerMgmtApp'));
    beforeEach(module('customerServices'));
    
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expect('GET', 'http://107.170.116.112/customersapi/v1/resources/customer/').
          respond([{customer_id: 1}, {customer_id: 2}]);

      scope = $rootScope.$new();
      ctrl = $controller('CustomersCtrl', {$scope: scope});
    }));

    it('should create "gridData" model with 2 customers returned from REST call', function() {
      $httpBackend.flush();
      expect(scope.gridData).toEqual([{customer_id: 1}, {customer_id: 2}]);
    });

  });

});


