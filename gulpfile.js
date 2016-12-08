var gulp = require('gulp');
var concat = require('gulp-concat');
var mocha = require('gulp-mocha');
var watch = require('gulp-watch');
var jsx = require('gulp-jsx');

var runSequence = require('run-sequence');
var requirejsOptimize = require('gulp-requirejs-optimize');

gulp.task('test:unit', function () {
    return watch(['public/js/**/*.js'], function () {
        gulp.src('public/**/*.spec.js', {read: false})
            .pipe(mocha())
            .on('error', function (error) {
                console.error(error);
            });
    });
});

gulp.task('test:unit:backend', function () {
    return gulp.src('test/unit/**/*.spec.js', {read: false})
        .pipe(mocha({
            'reporter': 'mocha-jenkins-reporter',
            'reporterOptions': {
                'junit_report_name': 'Tests',
                'junit_report_path': 'unit.xml',
                'junit_report_stack': 1
            }
        }));
});

gulp.task('optimizer', function () {
    return gulp.src('public/js/app/main.js')
        .pipe(requirejsOptimize({
            baseUrl: './public/js/app',
            paths: {
                react: '../../../node_modules/react/dist/react.min',
                ReactDom: '../../../node_modules/react-dom/dist/react-dom.min',
                ReactRouter: '../../../node_modules/react-router/umd/ReactRouter.min',
                storage: 'storage/storage',
                fetch: '../../../node_modules/whatwg-fetch/fetch',
                Promise: '../../../node_modules/promise-polyfill/promise.min',
                redux: '../../../node_modules/redux/dist/redux',
                ReactRedux: '../../../node_modules/react-redux/dist/react-redux.min',
                reduxLogger: '../../../node_modules/redux-logger/dist/index.min',
                reduxThunk: '../../../node_modules/redux-thunk/dist/redux-thunk.min',
                Reselect: '../../../node_modules/reselect/dist/reselect',
                _: '../../../node_modules/lodash/lodash.min',
                classnames: '../../../node_modules/classnames/index'
            },
        }))
        .pipe(gulp.dest('public/js'));
});
gulp.task('default', done => runSequence('optimizer', done));