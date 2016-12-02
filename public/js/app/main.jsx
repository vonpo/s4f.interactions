define([
    'Promise',
    'fetch',
    'react',
    'redux',
    'ReactRedux',
    'reduxLogger',
    'reduxThunk',
    'ReactDom',
    'interaction/reducer',
    'interaction/interaction',
    'ui/animation/animation'], function (_Promise,
                                         _fetch,
                                         React,
                                         Redux,
                                         reactRedux,
                                         reduxLogger,
                                         thunkMiddleware,
                                         ReactDOM,
                                         reducer,
                                         Interaction,
                                         animation) {
    var Provider = reactRedux.Provider;
    var loggerMiddleware = reduxLogger();
    var root = document.getElementById('content');
    var loader = document.getElementById('main-loader');
    var store = Redux.createStore(reducer,
        Redux.applyMiddleware(
            thunkMiddleware.default,
            loggerMiddleware
        ));

    ReactDOM.render(<Provider store={store}>
            <Interaction />
        </Provider>,
        root, function () {
            animation
                .animate(loader, 'fade-out')
                .then(function () {
                    root.classList.remove('ui-transparent');
                    loader.classList.add('hide');
                });
        }
    );
});