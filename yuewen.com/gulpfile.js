var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

gulp.task('minify', function () {
  // js
  gulp.src([
    './src/js/**/*.js'
  ])
  // .pipe(plugins.uglify())
  .pipe(gulp.dest('./dist/js'));
  
  gulp.src([
    './src/lib/**/*.js'
  ])
  .pipe(gulp.dest('./dist/lib'));

  // scss,css
  gulp.src([
    './src/style/**/*.scss'
  ])
  .pipe(plugins.sassImport())
  .pipe(plugins.sass())
  .pipe(plugins.css())
  .pipe(gulp.dest('./dist/style'));

  gulp.src([
    './src/lib/**/*.css'
  ])
  .pipe(gulp.dest('./dist/lib'));
  
  // html
  gulp.src([
    './src/*.html'
  ])
    .pipe(plugins.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'));
});

// images
gulp.task('imageMinify', function () {
  gulp.src([
    './src/img/**/*.png'
  ])
    // .pipe(plugins.image())
    .pipe(gulp.dest('./dist/img'));

})

gulp.task('watch', function () {
  gulp.watch([
    "./src/js/*.js",
    "./src/style/*.scss",
    "./src/*.html"
  ], ["minify"]);
})
