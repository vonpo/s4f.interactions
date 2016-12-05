/* global describe, it, before, after */

const expect = require('expect.js');
const mockery = require('mockery');
const pollsRepo = [
    {
        _id: 'testPoll5',
        parent: 'pollGroup',
        editable: {
            finishDate: new Date('2011-10-10'),
            startDate: new Date('2010-10-10')

        }
    },
    {
        _id: 'nextPoll5',
        parent: 'pollGroup',
        editable: {
            finishDate: new Date('2011-10-10'),
            startDate: new Date('2011-10-10')

        }
    },
    {
        _id: 'testPoll',
        parent: 'pollGroup1',
        editable: {
            finishDate: new Date('2011-10-10'),
            startDate: new Date('2011-10-10')

        }
    },
    {
        _id: 'nextPollGood',
        name: 'goodPollName',
        parent: 'pollGroup1',
        editable: {
            finishDate: new Date('2025-10-10'),
            startDate: new Date('2011-10-10')

        }
    },
    {
        _id: 'nextPoll1NotActive',
        parent: 'pollGroup1',
        editable: {
            finishDate: new Date('2011-10-10'),
            startDate: new Date('2011-10-10')
        }
    }
];

function findByParent(params) {
    return pollsRepo.filter(function (poll) {
        return poll.parent === params.parent;
    });
}

function findByName(params) {
    return pollsRepo.filter(function (poll) {
        return params.name.$regex.test(poll._id);
    });
}


var userMock = {};
var dbMock = {
    Schema: {
        Poll: {
            find: function (params) {
                return {
                    lean: function () {
                        return Promise.resolve(findByParent(params));
                    }
                };
            },
            findOne: function (params) {
                return {
                    exec: function (done) {
                        done(null, findByName(params).pop());
                    }
                };
            }
        }
    }
};

describe('Poll service tests', function () {
    before(function () {
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });
        mockery.registerMock('../db/db', dbMock);
        mockery.registerMock('../user/service', userMock);
        this.pollService = require('../../../../lib/poll/service');
    });

    after(function () {
        mockery.deregisterMock('../db/db');
        mockery.deregisterMock('../user/service');
        mockery.disable();
    });

    it('should return poll event if it is not active', function (done) {
        this.pollService.getActiveByParent('pollGroup', (err, polls) => {
            expect(polls).not.to.be(undefined);
            expect(polls.length).to.be.greaterThan(0);
            done();
        });
    });

    it('should return active poll', function (done) {
        this.pollService.getActiveByParent('pollGroup1', (err, polls) => {
            expect(polls).not.to.be(undefined);
            expect(polls.length).to.be.greaterThan(0);
            expect(polls[0]._id).to.be('nextPollGood');
            done();
        });
    });

    it('should return other active poll if requested one is not active', function (done) {
        this.pollService.getPoll('nextPoll1NotActive', (err, poll) => {
            expect(poll).not.to.be(undefined);
            expect(poll.id).to.be('nextPoll1NotActive');
            expect(poll.isStarted).to.be(true);
            expect(poll.finished).to.be(true);
            expect(poll.suggestActivePoll.id).to.be('nextPollGood');
            expect(poll.suggestActivePoll.name).to.be('goodPollName');
            expect(poll.suggestActivePoll.finished).to.be(false);
            done();
        })
    });

    it('should return requested poll if there is no other active poll', function (done) {
        this.pollService.getPoll('testPoll5', (err, poll) => {
            expect(poll).not.to.be(undefined);
            expect(poll.id).to.be('testPoll5');
            expect(poll.isStarted).to.be(true);
            expect(poll.finished).to.be(true);
            expect(poll.suggestActivePoll).to.be(false);
            done();
        })
    })
});