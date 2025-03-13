const gulp = require('gulp');
const babel = require('gulp-babel') 
const htmlmin = require('gulp-htmlmin') 
const uglify = require('gulp-uglify') 
const watch = require('gulp-watch') 
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps') 
const rename = require('gulp-rename') 

function compilaSass() {
    return gulp.src('./src/styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/styles'))
}

function comprimeHtml() {
    return gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'))
}


function comprimeJavaScript(){
    return gulp.src('src/scripts/*.js')
    .pipe(babel()) 
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/scripts'))
}


module.exports = {
    default: gulp.series(compilaSass, comprimeHtml, comprimeJavaScript)
  };

gulp.task('watch', (done) => {
    watch('./src/styles/*.scss', {ignoreInitial: false}, gulp.series(compilaSass)), 
    watch('./src/*.html', {ignoreInitial: false}, gulp.series(comprimeHtml)),
    watch('./src/scripts/*.js', {ignoreInitial: false}, gulp.series(comprimeJavaScript));
    done();
});
