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
    .pipe(sourcemaps.init())
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

function watchFiles() {
    gulp.watch('./src/**/*.scss', {ignoreInitial: false}, compilaSass)
    gulp.watch('./src/*.html', {ignoreInitial: false}, comprimeHtml)
    gulp.watch('./src/scripts/*.js', {ignoreInitial: false}, comprimeJavaScript)
}

exports.default = gulp.series(compilaSass, comprimeHtml, comprimeJavaScript)
exports.watch = watchFiles;


