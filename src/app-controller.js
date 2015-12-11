define([
  'app'
], function(app) {
  'use strict';

  return app.controller('AppController', function() {
    var vm = this;

    vm.greeting = {
      message: 'Hello world!'
    };
  })

});
