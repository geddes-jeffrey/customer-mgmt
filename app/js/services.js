'use strict';

// Declare the customerServices module
var customerServices = angular.module('customerServices', []);

customerServices.factory('CustomerServices', ['$http', function($http){

    return {
            // Get all customers
            getCustomers: function(){
                return $http.get('http://107.170.116.112/customersapi/v1/resources/customer/')
                  .success(function(response){return response;});
            },
            
            // Add a customer
            addCustomer: function(customer){
                return $http.post('http://107.170.116.112/customersapi/v1/resources/customer/', customer)
                      .success(function(response){return response;});
            },
        
             // Delete a customer
            deleteCustomer: function(id){
                return $http.delete('http://107.170.116.112/customersapi/v1/resources/customer/' + id)
                      .success(function(response){return response;});
            },
        
           // Update a customer
            updateCustomer: function(customer){
                return $http.put('http://107.170.116.112/customersapi/v1/resources/customer/' + customer.customer_id, customer)
                      .success(function(response){return response;});
            }
     
    };
}]);


