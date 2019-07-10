Package.describe({
  name: 'kschingiz:meteor-measured',
  version: '1.0.2',
  summary: 'Meteor metrics library',
  git: 'https://github.com/kschingiz/meteor-measured',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.6.1');
  api.use('ecmascript');
  api.use('underscore');

  api.mainModule('meteor-measured.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('kschingiz:meteor-measured');
  api.mainModule('meteor-measured-tests.js');
});
