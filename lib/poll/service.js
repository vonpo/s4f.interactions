'use strict';

const Schema = require('../db/db').Schema;
const logger = require('bigscreen-logger');
const async = require('async');
const Vote = Schema.Vote;
const Poll = Schema.Poll;
const userService = require('../user/service');
const channel = require('../channel/service').channel;

function saveVote(data, callback) {
    async.waterfall([
        callback => userService.getOrRegisterUser(data.user, callback),
        (user, info, callback) => {
            var vote = new Vote({
                user: user._id,
                date: new Date(),
                option: data.vote,
                pollName: data.pollName
            });

            if (user.interactionsVoted.indexOf(data.pollName) === -1) {
                user.interactionsVoted.push(data.pollName);
                user.save();
            } else {
                logger.warn('already voted');
            }

            vote.save(callback);
        }
    ], callback);
}

function vote(data, callback) {
    Poll.findOne({name: {$regex: new RegExp(data.pollName + '$', 'i')}})
        .select('_id saveUser editable data parent name')
        .exec((err, poll) => {
            if (err || !poll) {
                logger.error(err);
                return callback(err || 'poll not found');
            }

            let finished = isFinished(poll);
            let started = isStarted(poll);

            if (finished || !started) {
                return callback({finished: finished, started: started})
            }

            poll.addVote(data, err => {
                if (err) {
                    return callback(err);
                }

                if (data.user) {
                    saveVote(data, callback);
                } else {
                    callback();
                }
                channel.notifyNewVote(poll.toObject());
            });
        });
}

function isFinished(poll) {
    return poll && poll.editable && poll.editable.finishDate && poll.editable.finishDate < new Date();
}
function isStarted(poll) {
    if (!poll.editable || !poll.editable.startDate) {
        return true;
    }

    return new Date() > poll.editable.startDate;
}

function onlyActive(poll) {
    return isStarted(poll) && !isFinished(poll);
}

function createWebPoll(poll) {
    return  {
        id: poll._id,
        name: poll.name,
        templateVote: poll.templateVote,
        templateContainer: poll.templateContainer,
        data: poll.data,
        parent: poll.parent,
        suggestActivePoll: false,
        finished: isFinished(poll),
        isStarted: isStarted(poll)
    };
}

function getPoll(name, callback) {
    Poll
        .findOne({name: {$regex: new RegExp(name + '$', 'i')}})
        .exec((err, poll) => {
            if (err || !poll) {
                return callback(err || 'poll not found');
            }

            var result = createWebPoll(poll);

            if (result.finished) {
                getActiveByParent(poll.parent, (err, polls) => {
                    if (err) {
                        logger.warn('error while getting getActiveByParent', err);
                        return callback(null, result);
                    }

                    var activePoll = polls.filter(mightBeActivePoll => mightBeActivePoll._id !== poll.id && onlyActive(mightBeActivePoll)).pop();

                    if (activePoll) {
                        result.suggestActivePoll = createWebPoll(activePoll);
                    }

                    callback(null, result);
                })
            } else {
                callback(null, result);
            }
        });
}

var isActive = poll => !isFinished(poll) && isStarted(poll);

function sortByActive(a, b) {
    if (isActive(a)) {
        return -1;
    } else if (isActive(b)) {
        return 1;
    }

    return 0;
}

function getActiveByParent(parent, callback) {
    Poll
        .find({parent: parent})
        .lean()
        .then(polls => polls.sort(sortByActive))
        .then(polls =>  callback(null, polls))
        .catch(callback)
}

exports.getActiveByParent = getActiveByParent;
exports.vote = vote;
exports.getPoll = getPoll;