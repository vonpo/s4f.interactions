requirejs.config({
    baseUrl: './js/app',
    paths: {
        react: '../../lib/react/dist/react',
        ReactDom: '../../lib/react-dom/dist/react-dom',
        ReactRouter: '../../lib/react-router/umd/ReactRouter.min',
        storage: 'storage/storage',
        fetch: '../../lib/whatwg-fetch/fetch',
        Promise: '../../lib/promise-polyfill/promise.min',
        redux: '../../lib/redux/dist/redux',
        ReactRedux: '../../lib/react-redux/dist/react-redux.min',
        reduxLogger: '../../../lib/redux-logger/dist/index.min',
        reduxThunk: '../../../lib/redux-thunk/dist/redux-thunk.min',
        Reselect: '../../lib/reselect/dist/reselect',
        _: '../../lib/lodash/lodash.min',
        classnames: '../../lib/classnames/index'
    },
    name: 'main',
    out: 'bundled.min.js'
});

requirejs(['main']);