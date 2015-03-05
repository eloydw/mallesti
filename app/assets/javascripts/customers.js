(function(){

  var app = angular.module('mallesti-customers', []);

// Controllers
  app.controller('CustomersController', ['$http', function($http){
  var scope = this;
  scope.customers = [];

  $http.get('/customers.json')
    .success(function(data){
      scope.customers = data.customers;
    })

  scope.removeCustomer = function(customer) {
    if (confirm("¿Estás seguro que deseas borrar el cliente" + customer.name + "?")) {
      $http.delete("/customers/" + customer.id + ".json")
        .success(function() {
          // Busco el índice del array que contiene el objeto "customer"
          var index = scope.customers.indexOf(customer);
          // Borra la posición index del array
          scope.customers.splice(index, 1);
        })
        
    }
  }
    $http.get('/customers.json')
      .success(function(data){
        scope.customers = data.customers;
        })

  }]);

  app.controller('CustomerInfoController', ['$http', '$state', function($http, $state){
    var scope = this;
    scope.customer = {};

    $http.get('/customers/' + $state.params.id_customer + '.json')
    .success(function(data){
      scope.customer = data.customer;
    })
  }]);


// Directives
app.directive('customersList', function() {
  return {
    restrict: 'E',
    templateUrl: 'customers-list.html'
  };

  });
})();
