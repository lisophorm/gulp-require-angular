'use strict'

require.config({
  paths: {
    'angular': 'vendor/angular',
    'angular-ui-router': 'vendor/angular-ui-router'
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
