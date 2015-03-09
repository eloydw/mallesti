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


  }]);

  app.controller('CustomerInfoController', ['$http', '$state', function($http, $state){
    var scope = this;
    scope.customer = {};

    $http.get('/customers/' + $state.params.id_customer + '.json')
    .success(function(data){
      scope.customer = data.customer;
    })
  }]);

  app.controller('CustomerFormController', [ '$http', '$state', function($http, $state){
   var scope = this;
   scope.mostrar = false;
   scope.newCustomer = {};

   scope.on = function(){
     scope.mostrar = !scope.mostrar;
   }

   scope.createCustomer = function(customer) {
    if(scope.newCustomer != {}) {
    $http.post("/customers.json" , {customer: scope.newCustomer})
      .success(function (data) {
        customer.push(data.customer);
        scope.newCustomer = {};
      })
      alert('Debes rellenar los campos del formulario por favor')
      .error(function(data){
        scope.errors = data.errors;
      })
    }
   }

   }]);


// Directives
app.directive('customersList', function() {
  return {
    restrict: 'E',
    templateUrl: 'customers-list.html'
  };

  });
})();
