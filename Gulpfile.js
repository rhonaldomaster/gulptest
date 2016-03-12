var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var distfolder = 'dist';
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('sass', function () {
  console.log("Generando css desde scss");
  return gulp
    .src('scss/*.scss')
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(gulp.dest(distfolder+'/css'));
});
gulp.task('watch', function() {
  return gulp
    .watch('scss/*.scss', ['sass'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});
gulp.task('htmldist',function() {
  console.log("Copiando html a dist");
  return gulp
  .src('*.+(html|htm)')
  .pipe(gulp.dest(distfolder+''));
});
gulp.task('jsdist',function() {
  console.log("Copiando js a dist");
  return gulp
  .src('js/*.js')
  .pipe(gulp.dest(distfolder+'/js'));
});
gulp.task('cssdist',function() {
  console.log("Copiando css a dist");
  return gulp
  .src('css/*.css')
  .pipe(gulp.dest(distfolder+'/css'));
});
gulp.task('imgdist',function() {
  console.log("Copiando img a dist");
  return gulp
  .src('img/*.+(png|jpg|jpeg|gif|svg|bmp)')
  .pipe(gulp.dest(distfolder+'/img'));
});
gulp.task('clean:dist', function() {
  return del.sync(distfolder);
});
gulp.task('default',['sass','htmldist','cssdist','jsdist','imgdist']);
