/* global describe, it, before */
var expect = require('expect.js');
var requirejs = require('requirejs');

requirejs.config({
    baseUrl: 'public/js/app',
    paths: {
        storage: 'storage/storage',
        _: '../../../node_modules/lodash/lodash.min',
    }
});

describe('interaction reducer', function () {
    before(function (done) {
        requirejs(['interaction/reducer', 'interaction/actions'], function (Reducer, Actions) {
            this.Reducer = Reducer;
            this.Actions = Actions;
            done();
        }.bind(this))
    });

    it('should indicate selection of item', function () {
        var result = this.Reducer(null, { type: this.Actions.selectInteractionItem.IN_PROGRESS, value: 'action1'});

        expect(result.selectedItem).to.eql('action1');
        expect(result.voteInProgress).to.equal(true);
        expect(result.canVoteAgain).to.equal(false);
    });

    it('should indicate selection end of item', function () {
        var result = this.Reducer(null, { type: this.Actions.selectInteractionItem.SUCCESS});

        expect(result.voteInProgress).to.equal(false);
    });

    it('should not change voteInProgress after save interaction vote', function () {
        var state = { voteInProgress: true };
        var result = this.Reducer(state, { type: this.Actions.voteInteraction.SUCCESS });

        expect(result.voteInProgress).to.equal(true);
    });

    it('should set correct phase finished', function () {
        var state = { };
        var interaction = { isStarted: true, finished : true, data : { options: [] } };
        var result = this.Reducer(state, { type: this.Actions.getInteraction.SUCCESS, value : interaction });

        expect(result.phase).to.equal('finished');
    });

    it('should set correct phase notStarted', function () {
        var state = { };
        var interaction = { isStarted: false, finished : true, data : { options: [] } };
        var result = this.Reducer(state, { type: this.Actions.getInteraction.SUCCESS, value : interaction });

        expect(result.phase).to.equal('notStarted');
    });

    it('should set correct phase when change from notStarted to started', function () {
        var state = { };
        var interaction = { isStarted: false, finished : true, data : { options: [] } };
        var result = this.Reducer(state, { type: this.Actions.getInteraction.SUCCESS, value : interaction });

        expect(result.phase).to.equal('notStarted');

        interaction = { isStarted: true, finished : false, data : { options: [] } };
        result = this.Reducer(result, { type: this.Actions.getInteraction.SUCCESS, value : interaction });

        expect(result.phase).to.equal('vote');
    });
});