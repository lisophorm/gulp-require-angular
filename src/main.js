(function() {

  require.config({
    paths: {
      'angular': '../bower_components/angular/angular',
      'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router'
    },

    // List here non-AMD scripts that do not already call define()
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
    console.log('Loaded required sources');

    angular.bootstrap(document.getElementById('ng-app'), ['myApp']);
  });

})();
