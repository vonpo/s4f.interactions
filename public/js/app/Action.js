define(function () {
    function Action(name, fn) {
        this.action = fn;
        this.IN_PROGRESS = name + 'IN_PROGRESS';
        this.SUCCESS = name + 'SUCCESS';
        this.FAIL = name + 'FAIL';
    }

    return Action;
});