'use strict';

// Declare the customerCache module
var customerCache = angular.module('customerCache', []);

// Create the CustomerData cache
customerCache.factory('CustomerCache', ['$cacheFactory', function($cacheFactory){
      return $cacheFactory('CustomerData');
}]);


