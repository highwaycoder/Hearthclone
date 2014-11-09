var gulp = require('gulp'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass');

gulp.task('client', function () {
  gulp.src('client/js/main.js')
      .pipe(browserify({
        transform: ['hbsfy'],
        extensions: ['.hbs']
      }))
      .pipe(rename('hearthclone.js'))
      .pipe(gulp.dest('./build'));
});

gulp.task('client-watch', function () {
  gulp.watch('client/js/**/*.js', ['client']);
});

gulp.task('sass', function () {
  gulp.src('client/**/*.scss')
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('client/assets/css'));
});

gulp.task('sass-watch', function () {
  gulp.watch('client/**/*.scss', ['sass']);
});
