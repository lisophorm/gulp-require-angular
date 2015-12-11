(function() {

var gulp = require('gulp'),
  del = require('del')
  browserSync = require('browser-sync').create(),
  eslint = require('gulp-eslint'),
  uglify = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps'),
  minifyHtml = require('gulp-minify-html'),
  ngAnnotate = require('gulp-ng-annotate'),
  rev = require('gulp-rev'),
  templateCache = require('gulp-angular-templatecache'),
  less = require('gulp-less'),
  minifyCSS = require('gulp-minify-css'),
  templatesToCache = [
    './src/**/*.tpl.html'
  ],
  vendorLibs = [
    './bower_components/angular/angular.min.js',
    './bower_components/angular-ui-router/release/angular-ui-router.min.js'
  ];

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
    .pipe(gulp.dest('./dist/vendor/'));

  // Annotate, uglify, create source maps and copy JS source files to /dist
  gulp.src(['./src/**/*.js'])
    .pipe(ngAnnotate())
    .pipe(sourcemaps.init())
    .pipe(uglify()).on('error', errorHandler)
    .pipe(sourcemaps.write('maps'))
    // .pipe(rev())
    .pipe(gulp.dest('./dist/'));

  // Minify index.html and copy to /dist
  gulp.src(['./src/index.html'])
    .pipe(minifyHtml())
    .pipe(gulp.dest('./dist/'));

  // Create template cache
  gulp.src(templatesToCache)
    .pipe(templateCache({
      moduleSystem: 'RequireJS',
      standalone: true
    }))
    // .pipe(rev())
    .pipe(gulp.dest('./dist/'));

  // Parse LESS files and minify resulting CSS
  gulp.src('./src/**/*.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/'))

  // Copy vendor libs to /dist/vendor
  return gulp.src(vendorLibs)
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
