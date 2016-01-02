var assert = require('assert');
var gulp = require('gulp');
var del = require('del');
var babel = require('gulp-babel');
var mocha = require('gulp-mocha');

// Clean

gulp.task('clean', function (done) {
  return del(['build', 'public/lib', 'npm-debug.log', '!*/.gitkeep'], done);
});

// Build

gulp.task('build:src', function () {
  return gulp.src('src/**/*.js')
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest('build/src/'));
});

gulp.task('build:res', function () {
  return gulp.src('fonts/**/*')
    .pipe(gulp.dest('build/fonts/'));
});

gulp.task('build:test:src', function () {
  return gulp.src('test/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('build/test/'));
});

gulp.task('build', ['build:src', 'build:res', 'build:test:src']);

// Test

gulp.task('version-check', function() {
  var packageVer = require('./package.json')['version'];
  var tagVer = process.env['TRAVIS_TAG'];

  if(tagVer !== '') {
    assert.equal(packageVer, tagVer, 'Package version and tagged version are mismatched.');
  }
});

gulp.task('test', ['build', 'version-check'], function (done) {
  gulp.src('build/test/**/*.js')
    .pipe(mocha())
    .on('end', done);
});
