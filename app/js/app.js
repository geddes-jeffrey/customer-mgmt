'use strict';

// Declare the app module and inject dependencies
var customerMgmtApp = angular.module('customerMgmtApp', [
    'ngGrid',
    'ngRoute',
    'customerControllers',
    'customerServices',
    'customerCache'
]);

customerMgmtApp.config(['$routeProvider',
    function($routeProvider){
        // Define the routes
        $routeProvider.
            // When the URL hash fragment matches '/customers', use the customers view
            when('/customers', {
                templateUrl: 'partials/customers.html',
                controller: 'CustomersCtrl'
        }).
            // When the URL hash fragment matches '/customers/:Id', use the customer detail view.
            when('/customers/:id', {
                templateUrl: 'partials/customer-detail.html',
                controller: 'CustomersDetailCtrl'
        }).
            // When the browser address doesn't match any routes, redirect to '/customers'.
            otherwise({
                redirectTo: '/customers'
        });
    }]);

