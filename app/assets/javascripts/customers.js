(function(){

  var app = angular.module('mallesti-customers', []);

// Controllers
  app.controller('CustomersController', ['$http', function($http){
    var scope = this;
    scope.customers = [];
    scope.mostrar = false;
    scope.model = {};

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

/* Para mostrar el formulario en la página o esconderlo*/
    scope.on = function(){
      scope.mostrar = !scope.mostrar;
    }
/* Para crear un nuevo cliente*/
    scope.saveCustomer = function() {
      if(scope.model != {}) {
        $http.post("/customers.json" , {customer: scope.model})
        .success(function (data) {
          scope.customers.push(data.customer);
          scope.model = {};
        })
        .error(function(data){
          scope.errors = data.errors;
        })
      }
    }


  }]);

  app.controller('CustomerInfoController', ['$http', '$state', function($http, $state){
    var scope = this;
    scope.customer = {};
    scope.model = {};
    scope.errors = {};
    scope.mostrar = false;

    $http.get('/customers/' + $state.params.id_customer + '.json')
    .success(function(data){
      scope.customer = data.customer;
      angular.copy(data.customer, scope.model);
    })

    scope.on = function() {
      scope.mostrar = !scope.mostrar;
    }

    scope.saveCustomer = function() {
      $http.put("/customers/" + scope.customer.id + ".json", {customer:scope.model})
        .success(function() {
          angular.copy(scope.model, scope.customer); //copia y modifica el customer
          scope.errors = {}; // oculta los errores
          scope.mostrar = false; // oculta el formulario
        })
        .error(function() {
          scope.errors = data.errors;
        })
    }
  }]);





// Directives
app.directive('customersList', function() {
  return {
    restrict: 'E',
    templateUrl: 'customers-list.html'
  };

});

app.directive('customersForm', function() {
  return {
    restrict: 'E',
    templateUrl: 'customers-form.html',
    scope: {
      ctrl:'='
    }
  };
});

app.directive('CustomerInfoController',function() {
  return {
    restrict: 'E',
    templateUrl: 'customer-info.html',

  }
});

})();
