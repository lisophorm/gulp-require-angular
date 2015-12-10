'use strict'

define([
  'app'
], function(app) {

  return app.controller('AppController', function() {
    this.greeting = {
      message: 'Hello world!'
    };
  })

});
