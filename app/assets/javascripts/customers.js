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
