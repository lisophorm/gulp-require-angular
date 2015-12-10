'use strict'

define([
  'app'
], function(app) {

  return app.run(/* ngInject */function($log) {
    $log(app.name + ' run block executed');
  });

});
