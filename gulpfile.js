var gulp = require('gulp'),
  del = require('del')
  browserSync = require('browser-sync').create(),
  eslint = require('gulp-eslint');

gulp.task('clean', function() {
  // Delete /dist directory
  return del('./dist');
});

gulp.task('build', ['clean'], function() {
  // Run eslint on our JS files
  gulp.src('./src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());

  // Copy JS source files to /dist
  gulp.src(['./src/**/*'])
    .pipe(gulp.dest('./dist'));

  // Copy vendor libs to /dist/vendor
  return gulp.src([
      './bower_components/requirejs/require.js',
      './bower_components/angular/angular.js',
      './bower_components/angular-ui-router/release/angular-ui-router.js'
    ])
    .pipe(gulp.dest('./dist/vendor'));
});

gulp.task('serve', ['build'], function() {
  browserSync.init({
    server: 'dist'
  });

  // Start watching for changes in source files
  gulp.watch('./src/**/*', ['build', browserSync.reload]);
});

gulp.task('default', ['build']);
