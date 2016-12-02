var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var mocha = require('gulp-mocha');
var watch = require('gulp-watch');

var runSequence = require('run-sequence');

gulp.task('uglifyScripts', function (cb) {
    pump([
            gulp.src(['public/js/**/main.js', 'public/js/**/test.js']),
            uglify(),
            gulp.dest('temp')
        ],
        cb
    );
});

gulp.task('test:unit', function () {
    return watch(['public/js/**/*.js'], function () {
        gulp.src('public/**/*.spec.js', {read: false})
            .pipe(mocha())
            .on('error', function (error) {
                console.error(error);
            });
    });
});

gulp.task('clean', function () {
    return gulp.src('temp', {read: false})
        .pipe(clean());
});

gulp.task('concatScripts', function() {
    return gulp.src([
        //'node_modules/react/dist/react.js',
        // 'node_modules/react-dom/dist/react-dom.js',
        'temp/**/*.js',
        ])
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('default', done => runSequence('uglifyScripts', 'concatScripts', 'clean', done));