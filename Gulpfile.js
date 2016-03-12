var gulp = require('gulp');
var sass = require('gulp-sass');
var distfolder = 'dist';
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('sass', function () {
  return gulp
    .src('./scss/*.scss')
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(gulp.dest('./'+distfolder+'/css'));
});
gulp.task('watch', function() {
  return gulp
    .watch(input, ['sass'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});
gulp.task('htmldist',function() {
  return gulp
  .src('*.+(html|htm)')
  .pipe(gulp.dest('./'+distfolder+''));
});
gulp.task('jsdist',function() {
  return gulp
  .src('./js/*.js')
  .pipe(gulp.dest('./'+distfolder+'/js'));
});
gulp.task('imgdist',function() {
  return gulp
  .src('./img/*.+(png|jpg|jpeg|gif|svg|bmp)')
  .pipe(gulp.dest('./'+distfolder+'/img'));
});
gulp.task('default', ['sass', 'watch']);
gulp.task('todist',['sass','htmldist','jsdist','imgdist']);
