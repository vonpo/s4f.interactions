define(function () {
    function animate(what, css) {
        return new Promise(function (resolve) {
            what.classList.add(css);
            what.addEventListener('transitionend', function () {
                resolve();
            });
        });
    }

    return {
        animate: animate
    }
});