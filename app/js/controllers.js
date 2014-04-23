'use strict';

// Declare the customerControllers module
var customerControllers = angular.module('customerControllers', ['ngGrid']);

customerControllers.controller('CustomersCtrl', ['$scope', '$location', 'CustomerServices', 'CustomerCache',
    function($scope, $location, CustomerServices, CustomerCache){
        
        // Grid properties
        $scope.gridData = [];
        $scope.gridOptions = {
            data: 'gridData',
            enableColumnResize: true,
            width: 'auto',
            multiSelect: false,
            showFilter: true,
            showFooter: true,
            columnDefs: [
                { field: 'customer_id', displayName: 'Id' },
                { field: 'first_name', displayName: 'First Name'},
                { field: 'last_name', displayName: 'Last Name'},
                { field: 'email', displayName: 'Email'},
                { field: 'create_date', displayName: 'Create Date'},
                { field: 'last_update', displayName: 'Last Update'},
                { field: '', displayName: 'Actions', cellTemplate: 'partials/grid-actions-template.html'}
            ]

        };
        
        // Populate the grid
        CustomerServices.getCustomers()
            .then(function(response){
                $scope.gridData=response.data;
            }, function(err){$scope.messages= 'An error occurred: ' + err.status + ' - ' + err.statusText;});
        
        // Delete Customer
        $scope.deleteCustomer = function(row){
            CustomerServices.deleteCustomer(row.entity.customer_id)
                .then(function(){
                    // Remove the row from the grid
                    var index = $scope.gridData.indexOf(row.entity);
                    $scope.gridData.splice(index, 1);
                }, function(err){$scope.messages= 'An error occurred: ' + err.status + ' - ' + err.statusText;});
            };
        
        // Update Customer
         $scope.updateCustomer = function(row){
             // Save customer data to cache
             CustomerCache.put('CustomerData', row.entity);
             $location.path('/customers/' + row.entity.customer_id);
            };

}]);

customerControllers.controller('CustomersDetailCtrl', ['$scope', '$location', '$routeParams', 'CustomerServices', 'CustomerCache',
    function($scope, $location, $routeParams, CustomerServices, CustomerCache){

        if ($routeParams.id === 'new'){
            $scope.customer = {};
        }else{
            $scope.customer = CustomerCache.get('CustomerData');
        }

        $scope.form = {
            submit: function() {
                
                if($scope.customerform.$invalid) {
                    return false;
                }

                if ($scope.customer.hasOwnProperty("customer_id")){
                    // Update Customer
                    CustomerServices.updateCustomer($scope.customer)
                        .then(function(){
                                $location.path('/customers');
                            }, function(err){$scope.messages= 'An error occurred: ' + err.status + ' - ' + err.statusText;});
                }else{
                    // Add Customer
                    CustomerServices.addCustomer($scope.customer)
                        .then(function(){
                                $location.path('/customers');
                            }, function(err){$scope.messages= 'An error occurred: ' + err.status + ' - ' + err.statusText;});
                }
            }
        };
            
}]);
