define(function () {
    function getTimeStamp() {
        var date = new Date();

        return date.getYear() + '' + date.getMonth() + '' + date.getDate();
    }

    function saveLocal(key, value, timeStamp) {
        key = timeStamp ? key + getTimeStamp() : key;

        localStorage.setItem(key, JSON.stringify(value));
    }

    function getLocal(key, timeStamp) {
        key = timeStamp ? key + getTimeStamp() : key;

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