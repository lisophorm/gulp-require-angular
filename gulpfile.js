var gulp = require('gulp'),
  del = require('del')
  browserSync = require('browser-sync').create();

gulp.task('clean', function() {
  return del('./dist');
});

gulp.task('build', ['clean'], function() {
  gulp.src(['./src/**/*'])
    .pipe(gulp.dest('./dist'));

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

  gulp.watch('./src/**/*', ['build', browserSync.reload]);
});

gulp.task('default', ['build']);
