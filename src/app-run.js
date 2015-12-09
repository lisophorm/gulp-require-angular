'use strict'

define([
  'app'
], function(app) {

  return app.run(function() {
    console.log(app.name + ' run block executed');
  });

});
