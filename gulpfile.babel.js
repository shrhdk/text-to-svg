'use strict';

import assert from 'assert';
import gulp from 'gulp';
import del from 'del';
import babel from 'gulp-babel';
import mocha from 'gulp-mocha';

// Clean

gulp.task('clean', (done) => {
  return del(['build', 'public/lib', 'npm-debug.log', '!*/.gitkeep'], done);
});

// Build

gulp.task('build:src', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest('build/src/'));
});

gulp.task('build:res', () => {
  return gulp.src('fonts/**/*')
    .pipe(gulp.dest('build/fonts/'));
});

gulp.task('build:test:src', () => {
  return gulp.src('test/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('build/test/'));
});

gulp.task('build', ['build:src', 'build:res', 'build:test:src']);

// Test

gulp.task('version-check', () => {
  var packageVer = require('./package.json')['version'];
  var tagVer = process.env['TRAVIS_TAG'];

  if (tagVer) {
    assert.equal(packageVer, tagVer, `Package version and tagged version are mismatched. Package version is ${packageVer}, but tagged version is ${tagVer}`);
  }
});

gulp.task('test', ['build', 'version-check'], (done) => {
  gulp.src('build/test/**/*.js')
    .pipe(mocha())
    .on('end', done);
});
