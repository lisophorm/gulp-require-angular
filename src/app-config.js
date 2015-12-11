'use strict'

define([
  'app',
  'app-controller'
], function(app) {

  return app.config(
    /** @ngInject */
    function($logProvider, $stateProvider, $urlRouterProvider) {
      // Enable log
      $logProvider.debugEnabled(true);

      $stateProvider
        .state('root', {
          url: '/',
          templateUrl: 'app.html',
          controller: 'AppController as app'
        });

      $urlRouterProvider.otherwise('/');
    }
  );

});
