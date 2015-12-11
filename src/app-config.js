define([
  'app',
  'app-controller'
], function(app) {
  'use strict';
  
  return app.config(
    /** @ngInject */
    function($logProvider, $stateProvider, $urlRouterProvider) {
      // Enable log
      $logProvider.debugEnabled(true);

      $stateProvider
        .state('root', {
          url: '/',
          templateUrl: 'app.tpl.html',
          controller: 'AppController as app'
        });

      $urlRouterProvider.otherwise('/');
    }
  );

});
