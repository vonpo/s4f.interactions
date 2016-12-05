define([
    'Promise',
    'fetch',
    'react',
    'redux',
    'ReactRedux',
    'reduxLogger',
    'reduxThunk',
    'ReactDom',
    'url/service',
    'interaction/reducer',
    'interaction/interaction',
    'interaction/actions',
    'interaction/service',
    'ui/animation/animation'], function (_Promise,
                                         _fetch,
                                         React,
                                         Redux,
                                         reactRedux,
                                         reduxLogger,
                                         thunkMiddleware,
                                         ReactDOM,
                                         UrlService,
                                         reducer,
                                         Interaction,
                                         actions,
                                         InteractionService,
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

    var interactionId = UrlService.extractUrl(location.pathname)[0];

    store.dispatch({
        type: actions.boot,
        value: { vote: InteractionService.getTempVote(interactionId) }
    });

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