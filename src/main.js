'use strict'

require.config({
  paths: {
    'angular': 'vendor/angular.min',
    'angular-ui-router': 'vendor/angular-ui-router.min'
  },
  shim: {
    'angular': {
      exports: 'angular'
    },
    'angular-ui-router': {
      deps: ['angular']
    }
  }
});

require([
  'app',
  'app-config',
  'app-run'
], function() {
  angular.bootstrap(document, ['myApp']);
});
