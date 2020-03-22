var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var tsify = require('tsify');
var sourcemaps = require('gulp-sourcemaps');
var fancy_log = require('fancy-log');
var buffer = require('vinyl-buffer');

var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['packages/core/index.ts'],
    cache: {},
    packageCache: {},
}).plugin(tsify));

function coreBundle() {
    return watchedBrowserify
        .bundle()
        .pipe(source('core.js'))
        .on('error', fancy_log)
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: false }))
        .pipe(gulp.dest('integrations/dist'));
}

gulp.task('build:core:watch', coreBundle);
watchedBrowserify.on('update', coreBundle);
watchedBrowserify.on('log', fancy_log);