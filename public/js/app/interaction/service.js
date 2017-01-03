define(['storage'], function (storage) {
    var timeoutId = null;

    function getTimeStamp() {
        var date = new Date();

        return date.getYear() + '' + date.getMonth() + '' + date.getDate();
    }

    function updateUrl(interaction) {
        var history = typeof window !== 'undefined' && window.history;

        if(!history) {
            return;
        }

        history.pushState(null, document.title, interaction);
    }
    function handlePollResult() {
        return function (response) {
            var poll = response.suggestActivePoll;

            if (poll && !poll.finished) {
                storage.saveLocal('tempAnswer' + poll.name + getTimeStamp(), null);
                updateUrl(poll.name);
                return Promise.resolve(poll);
            }

            return Promise.resolve(response);
        }
    }

    function vote(interactionId, vote) {
        return fetch('api/poll/' + interactionId + '/vote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({vote: {option: vote}})
        })
            .then(function (response) {
                if (response.status !== 200) {
                    return Promise.reject({ locked : response.status === 423})
                }

                return response;
            })
            .then(saveTempVote.bind(null, interactionId, vote));
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

    function saveTempVote(poll, answer) {
        var toSave = {
            pollName: poll,
            answer: {option: answer, time: Date.now()}
        };

        toSave = answer === null ? null : toSave;

        storage.saveLocal('tempAnswer' + poll + getTimeStamp(), toSave);
    }

    function getTempVote(poll) {
        return storage.getLocal('tempAnswer' + poll + getTimeStamp());
    }

    function triggerWhenCanVote(tempVote) {
        var secondsToNextVote = ((typeof window !== 'undefined') &&
            window.bigScreen &&
            window.bigScreen.nextVoteTime)
            || 0.1;
        var waitTime = secondsToNextVote * 1000;
        var now = Date.now();

        if (tempVote && tempVote.answer && tempVote.answer.time) {
            var fromLastVote = now - tempVote.answer.time;

            var wait = fromLastVote < waitTime;

            if (wait) {
                return new Promise(function (resolve) {
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                        timeoutId = null;
                    }

                    timeoutId = setTimeout(function () {
                        resolve(true);
                    }, waitTime - fromLastVote)
                });
            }
        }

        return Promise.resolve(true);
    }

    return {
        getInteraction: getInteraction,
        vote: vote,
        getTempVote: getTempVote,
        triggerWhenCanVote: triggerWhenCanVote
    }
});