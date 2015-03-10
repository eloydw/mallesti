(function(){

  var app = angular.module('mallesti', ['ui.router','templates', 'mallesti-customers']);


  app.config(function($urlRouterProvider, $stateProvider){
  // Para las urls que no se encuentren, redirigimos a la raíz.
  $urlRouterProvider.otherwise("/customers");


  // Aquí establecemos los estados de nuestra applicación.

  $stateProvider
    .state("customers", {
      url:"/customers",
      templateUrl:"customer.html",
      controller: "CustomersController",
      controllerAs: "customersCtrl"
    })

    .state("customer", {
      url:"/customers/:id_customer",
      templateUrl:"customer-info.html",
      controller: "CustomerInfoController",
      controllerAs: "customerInfoCtrl"
    })


  });
})();
