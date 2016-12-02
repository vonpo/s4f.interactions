define(function () {
    function extractUrl(path) {
        path = path || '/';

        return  path
            .split('/')
            .filter(function (element) { return element && element.length > 0; });
    }
    return {
        extractUrl: extractUrl
    }
});