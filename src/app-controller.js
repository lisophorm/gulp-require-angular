'use strict'

define([
  'app'
], function(app) {

  return app.controller('AppController', function() {
    var vm = this;

    vm.greeting = {
      message: 'Hello world!'
    };
  })

});
