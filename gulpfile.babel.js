/**
 * Copyright (c) 2016 Hideki Shiro
 */

/* eslint-disable no-process-env, global-require */

import path from 'path';
import assert from 'assert';
import gulp from 'gulp';
import del from 'del';
import babel from 'gulp-babel';
import mocha from 'gulp-mocha';
import eslint from 'gulp-eslint';

// Clean

gulp.task('clean', done => {
  return del(['build', 'npm-debug.log', '!*/.gitkeep'], done);
});

// Lint

gulp.task('lint', () => {
  return gulp.src(['src/**/*.js', 'test/**/*.js', 'gulpfile.babel.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

// Build

gulp.task('build:src', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel({ presets: ['es2015'] }))
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
  const packageVer = require('./package.json').version;
  const tagVer = process.env.TRAVIS_TAG;

  if (tagVer) {
    assert.equal(packageVer, tagVer, `Package version and tagged version are mismatched. Package version is ${packageVer}, but tagged version is ${tagVer}`);
  }
});

gulp.task('test', ['build', 'lint', 'version-check'], () => {
  return gulp.src('build/test/**/*.js')
    .pipe(mocha());
});

gulp.task('test:html', ['build', 'lint', 'version-check'], () => {
  const reporter = require('./build/test/html-reporter');
  const dest = path.join(__dirname, './build/test/result.html');
  return gulp.src('build/test/**/*.js')
    .pipe(mocha({ reporter, dest }));
});
