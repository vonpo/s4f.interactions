define(function (storage) {
    function getTimeStamp() {
        var date = new Date();

        return date.getYear() + '' + date.getMonth() + '' + date.getDate();
    }

    function handlePollResult() {
        return function (response) {
            var poll = response.suggestActivePoll;

            if (poll && !poll.finished) {
                storage.saveLocal('tempAnswer' + poll.name + getTimeStamp(), null);
                return Promise.resolve(poll);
            }

            return Promise.resolve(response);
        }
    }

    function getInteraction(id) {
        return fetch('api/poll/' + id)
            .then(function (response) {
                if (response.status !== 200) {
                    return Promise.reject()
                }

                return response.json();
            })
            .then(handlePollResult());
    }

    // export function vote(pollId, vote, user) {
    //     const restangular = getComponent('restangular');
    //
    //     return restangular.one('api/poll/' + pollId).post('vote', {vote: vote, user: user});
    // }
    //
    // export function register(pollName, vote, accessToken) {
    //     const restangular = getComponent('restangular');
    //
    //     return restangular.one('api/poll/' + pollName).post('register?access_token=' + accessToken, {
    //         vote: vote
    //     });
    // }
    //
    // export function saveTempVote(poll, answer) {
    //     var toSave = {
    //         pollName: poll,
    //         answer: answer
    //     };
    //
    //     toSave = answer === null ? null : toSave;
    //
    //     saveLocal('tempAnswer' + poll + getTimeStamp(), toSave);
    // }
    //
    // export function getTempVote(poll) {
    //     return getLocal('tempAnswer' + poll + getTimeStamp());
    // }

    return {
        getInteraction: getInteraction
    }
});