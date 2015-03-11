(function(){

  var app = angular.module('mallesti', ['ui.router', 'permission', 'templates', 'mallesti-components',
  'mallesti-customers', 'mallesti-auth', 'mallesti-permission']
);

// Esto pasa el token y el email en cada petición que hagamos a la API
app.factory("httpInterceptor", ['AuthService', function(AuthService) {
  return {
    request: function(config) {
      config.headers['X-User-Email'] = AuthService.currentUserEmail();
      config.headers['X-User-Token'] = AuthService.currentUserToken();
      return config;
    }
  };
}]);


  app.config(function($urlRouterProvider, $stateProvider, $httpProvider){
    // Configuramos todas las peticiones para pasar el token de usuario
  $httpProvider.interceptors.push("httpInterceptor");
  // Para las urls que no se encuentren, redirigimos a la raíz.
  $urlRouterProvider.otherwise("/login");


  // Aquí establecemos los estados de nuestra applicación.

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'login.html',
      controller: 'LoginController',
      controllerAs: 'loginCtrl',
      data: {
        permission: {
          only: ['anonymous'],
          redirectTo: 'home.info'
        }
      }
    })

    .state('home', {
      url: '/',
      templateUrl: 'home.html',
      data: {
        permission: {
          only: ['member'],
          redirectTo: 'login'
        }
      }
    })

    .state('home.customers', {
      url:'customers',
      templateUrl:'customer.html',
      controller: 'CustomersController',
      controllerAs: 'customersCtrl'
    })

    .state('home.customer', {
      url:'customers/:id_customer',
      templateUrl:'customer-info.html',
      controller: 'CustomerInfoController',
      controllerAs: 'customerInfoCtrl'
    })


  });
})();
