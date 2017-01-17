var gulp = require('gulp');
var concat = require('gulp-concat');
var mocha = require('gulp-mocha');
var watch = require('gulp-watch');
var jsx = require('gulp-jsx');
var less = require('gulp-less');
var gulpCopy = require('gulp-copy');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 6 versions'] });
var minifyCss = require('gulp-minify-css');
var runSequence = require('run-sequence');
var requirejsOptimize = require('gulp-requirejs-optimize');
var rename = require('gulp-rename');
var babel = require('gulp-babel');

gulp.task('less', function () {
    return gulp.src('./dist/public/css/main.less')
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(minifyCss())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('./public/css'));
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

gulp.task('test:unit:frontend', function () {
    return gulp.src('public/**/*.spec.js', {read: false})
        .pipe(mocha({
            'reporter': 'mocha-jenkins-reporter',
            'reporterOptions': {
                'junit_report_name': 'Tests Frontend',
                'junit_report_path': 'unit-frontend.xml',
                'junit_report_stack': 1
            }
        }));
});

gulp.task('test:unit:backend', function () {
    return gulp.src('test/unit/**/*.spec.js', {read: false})
        .pipe(mocha({
            'reporter': 'mocha-jenkins-reporter',
            'reporterOptions': {
                'junit_report_name': 'Tests Backend',
                'junit_report_path': 'unit.xml',
                'junit_report_stack': 1
            }
        }));
});

gulp.task('createDist', function () {
    return gulp.src(['public/js/**/*.*', 'public/css/**/*.*'])
        .pipe(gulpCopy('dist'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('jsx', function() {
    return gulp.src('./public/js/**/*.jsx').
        pipe(babel({
            plugins: ['transform-react-jsx']
        })).
        pipe(gulp.dest('./public/js'));
});

gulp.task('optimizer', function () {
    return gulp.src('./dist/public/js/app/main.js')
        .pipe(requirejsOptimize({
            baseUrl: './dist/public/js/app',
            paths: {
                react: '../../../../node_modules/react/dist/react.min',
                ReactDom: '../../../../node_modules/react-dom/dist/react-dom.min',
                ReactRouter: '../../../../node_modules/react-router/umd/ReactRouter.min',
                storage: 'storage/storage',
                fetch: '../../../../node_modules/whatwg-fetch/fetch',
                Promise: '../../../../node_modules/promise-polyfill/promise.min',
                redux: '../../../../node_modules/redux/dist/redux.min',
                ReactRedux: '../../../../node_modules/react-redux/dist/react-redux.min',
                reduxLogger: '../../../../node_modules/redux-logger/dist/index.min',
                reduxThunk: '../../../../node_modules/redux-thunk/dist/redux-thunk.min',
                Reselect: '../../../../node_modules/reselect/dist/reselect',
                _: '../../../../node_modules/lodash/lodash.min',
                classnames: '../../../../node_modules/classnames/index'
            },
        }))
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('public/js'));
});
gulp.task('default', done => runSequence('createDist', 'jsx', 'less', 'optimizer', done));