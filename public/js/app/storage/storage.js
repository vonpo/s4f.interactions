define(function () {
    function saveLocal(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function getLocal(key) {
        var value = localStorage.getItem(key);

        if (value) {
            try {
                return JSON.parse(value);
            } catch (e) {
                return null;
            }
        }

        return null;
    }

    return {
        saveLocal: saveLocal,
        getLocal: getLocal
    }
});