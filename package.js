Package.describe({
  name: 'kschingiz:meteor-measured',
  version: '1.0.0',
  summary: 'Meteor metrics library',
  git: 'https://github.com/kschingiz/meteor-measured',
  documentation: 'README.md'
});

Npm.depends({
  'measured-core': '1.49.0',
  'measured-reporting': '1.49.0'
});

Package.onUse(function(api) {
  api.versionsFrom('1.7.0.5');
  api.use('ecmascript');

  api.mainModule('meteor-measured.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('kschingiz:meteor-measured');
  api.mainModule('meteor-measured-tests.js');
});
