define([
  'app'
], function(app) {
  'use strict';

  return app.run(
    /** @ngInject */
    function($log) {
      $log.debug(app.name + ' run block executed');
    }
  );

});
