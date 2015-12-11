(function() {

var gulp = require('gulp'),
  del = require('del')
  browserSync = require('browser-sync').create(),
  eslint = require('gulp-eslint'),
  uglify = require('gulp-uglify'),
  size = require('gulp-size'),
  sourcemaps = require('gulp-sourcemaps'),
  minifyHtml = require('gulp-minify-html'),
  ngAnnotate = require('gulp-ng-annotate');

function errorHandler() {
  // Common error handler
}

gulp.task('clean', function() {
  // Delete /dist directory
  return del('./dist');
});

gulp.task('build', ['clean'], function() {
  // Run eslint on our JS files
  gulp.src('./src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());

  // Uglify requirejs and copy it to /dist/vendor
  gulp.src('./bower_components/requirejs/require.js')
    .pipe(uglify({preserveComments: 'license'}))
    .pipe(gulp.dest('./dist/vendor/'))
    .pipe(size({showFiles: true}));

  // Annotate, uglify, create source maps and copy JS source files to /dist
  gulp.src(['./src/**/*.js'])
    .pipe(ngAnnotate())
    .pipe(sourcemaps.init())
    .pipe(uglify()).on('error', errorHandler)
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('./dist/'));

  // Minify html and copy to /dist
  gulp.src(['./src/**/*.html'])
    .pipe(minifyHtml())
    .pipe(gulp.dest('./dist/'))
    .pipe(size({showFiles: true}));

  // Copy vendor libs to /dist/vendor
  return gulp.src([
      './bower_components/angular/angular.min.js',
      './bower_components/angular-ui-router/release/angular-ui-router.min.js'
    ])
    .pipe(gulp.dest('./dist/vendor/'));
});

gulp.task('serve', ['build'], function() {
  browserSync.init({
    server: 'dist'
  });

  // Start watching for changes in source files
  gulp.watch('./src/**/*', ['build', browserSync.reload]);
});

gulp.task('default', ['build']);

})();
