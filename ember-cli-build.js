/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    'ember-cli-foundation-6-sass': {
      'foundationJs': 'all' // TODO: only include stuff I need
    },

    'esw-cache-first': {
      // RegExp patterns specifying which URLs to cache.
      patterns: [
        '/',
        '(.+)index.html(.+)',
        '/(.+)assets(.+)',
        'https://lexro.github.io/running-log/',
        'https://fonts.googleapis.com/css(.+)',
      ],

      // changing this version number will bust the cache
      version: '4'
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import('bower_components/moment-duration-format/lib/moment-duration-format.js');

  return app.toTree();
};
