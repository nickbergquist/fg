'use strict';

/**
 * DEPENDENCIES
 */
const gulp = require('gulp');
const util = require('gulp-util');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');

/**
 * PATHS
 */
const scssSrc = './src/sass/**/*.scss';
const cssDest = './build/css';

/**
 * SASS/CSS
 */
const sassOptions = {
    errLogToConsole: true
};

// dev build: CSS deployment 
gulp.task('dev-css', ['tear-down-css', 'dev-build-sass']);

// dev build: compile unminified SASS with linting and sourcemaps 
gulp.task('dev-build-sass', [], () => {
	return gulp
		.src(scssSrc)
		.pipe(sassLint())
		.pipe(sassLint.format())
		.pipe(sassLint.failOnError())
		.pipe(sourcemaps.init())
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write().on('end', () => util.log('Sourcemap created')))
		.pipe(gulp.dest(cssDest).on('end', () => util.log('CSS (compiled SASS) written to ' + cssDest)));
});

// remove all compiled CSS
gulp.task('tear-down-css', () => {
	return del.sync(cssDest + '*');
});


/**
 * WATCH TASKS
 */
// watch for changes in SASS files
gulp.task('watch', () => {
	gulp.watch(scssSrc, ['dev-build-sass']);
});

/**
 * MAIN TASKS
 */
// dev build
gulp.task('default', ['dev-build', 'watch']);
gulp.task('dev-build', ['dev-css']);
