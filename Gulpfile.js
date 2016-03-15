var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var distfolder = 'dist';
var appfolder = 'app';
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};
var mainBowerFiles = require('main-bower-files');
var filter = require('gulp-filter');
var concat = require('gulp-concat');

gulp.task('sass', function () {
  console.log("Generando css desde scss");
  return gulp
    .src(appfolder+'/scss/*.scss')
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(gulp.dest(distfolder+'/css'));
});
gulp.task('watch', function() {
  gulp.watch(appfolder+'/scss/*.scss', ['sass']);
  gulp.watch(appfolder+'/*.+(htm|html)', ['htmldist']);
  gulp.watch(appfolder+'/js/*.js', ['jsdist']);
  gulp.watch(appfolder+'/css/*.css', ['cssdist']);
  gulp.watch(appfolder+'/img/*.+(png|jpg|jpeg|gif|svg|bmp)', ['imgdist']);
});
gulp.task('htmldist',function() {
  console.log("Copiando html a dist");
  return gulp
  .src(appfolder+'/*.+(html|htm)')
  .pipe(gulp.dest(distfolder+''));
});
gulp.task('jsdist',function() {
  console.log("Copiando js a dist");
  return gulp
  .src(appfolder+'/js/*.js')
  .pipe(gulp.dest(distfolder+'/js'));
});
gulp.task('cssdist',function() {
  console.log("Copiando css a dist");
  return gulp
  .src(appfolder+'/css/*.css')
  .pipe(gulp.dest(distfolder+'/css'));
});
gulp.task('imgdist',function() {
  console.log("Copiando img a dist");
  return gulp
  .src(appfolder+'/img/*.+(png|jpg|jpeg|gif|svg|bmp)')
  .pipe(gulp.dest(distfolder+'/img'));
});
gulp.task('clean:dist', function() {
  return del.sync(distfolder);
});
gulp.task('jsf', function() {
  var jsFiles = [appfolder+'/js/*'];
  return gulp.src(mainBowerFiles())
		/*.pipe(filter(['*.js']))*/
		.pipe(concat('app.js'))
		.pipe(gulp.dest(distfolder+'/js'));
});
gulp.task('default',['sass','htmldist','cssdist','jsdist','imgdist']);
