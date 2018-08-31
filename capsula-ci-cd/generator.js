'use strict';

var path = require('path');
var isValid = require('is-valid-app');

module.exports = function(app) {
  if (!isValid(app, 'capsula-ci-cd')) return;
  
  app.task('travis', { silent: true }, function(cb) {
    return app.src('_travis.yml', {cwd: path.resolve(__dirname, 'templates')})
      .pipe(app.dest(function(file) {
        file.basename = '.travis.yml';
        return app.cwd;
      }));
  });
  
  app.task('deploy', { silent: true }, function(cb) {
    return app.src('_deploy.sh', {cwd: path.resolve(__dirname, 'templates')})
      .pipe(app.dest(function(file) {
        file.basename = 'build/deploy.sh';
        return app.cwd;
      }));
  });
  
  app.task('release', { silent: true }, function(cb) {
    return app.src('_release.sh', {cwd: path.resolve(__dirname, 'templates')})
      .pipe(app.dest(function(file) {
        file.basename = 'build/release.sh';
        return app.cwd;
      }));
  });
  
  app.task('trigger_travis_build', { silent: true }, function(cb) {
    return app.src('_trigger_travis_build.sh', {cwd: path.resolve(__dirname, 'templates')})
      .pipe(app.dest(function(file) {
        file.basename = 'build/trigger_travis_build.sh';
        return app.cwd;
      }));
  });
  
  app.task('default', ['travis', 'deploy', 'release', 'trigger_travis_build']);
};
