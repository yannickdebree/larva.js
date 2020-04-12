var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var tsify = require('tsify');
var fancy_log = require('fancy-log');
var buffer = require('vinyl-buffer');

const getBrowserifyObject = function(inputFile) {
  const defaultInputFile = {
    basedir: '.',
    debug: true,
    entries: ['packages/core/index.ts'],
    cache: {},
    packageCache: {}
  };
  return browserify({ ...defaultInputFile, ...inputFile }).plugin(tsify);
};

var watchedBrowserify = watchify(getBrowserifyObject());

function coreBundle() {
  return watchedBrowserify
    .bundle()
    .pipe(source('core.js'))
    .on('error', fancy_log)
    .pipe(buffer())
    .pipe(gulp.dest('integrations/dist'));
}

gulp.task('build:core:watch', coreBundle);
watchedBrowserify.on('update', coreBundle);
watchedBrowserify.on('log', fancy_log);

gulp.task('build:core', function() {
  return getBrowserifyObject({ debug: false })
    .bundle()
    .pipe(source('core.snake.js'))
    .pipe(gulp.dest('dist'));
});
