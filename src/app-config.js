(function() {

  define([
    'app',
    'app-controller'
  ], function(app) {
    return app.config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('root', {
          url: '/',
          templateUrl: 'app.html',
          controller: 'AppController as app'
        });

      $urlRouterProvider.otherwise('/');

      console.log(app.name + ' config block executed');
    });
  });

})();
