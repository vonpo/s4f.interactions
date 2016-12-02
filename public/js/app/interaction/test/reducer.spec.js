/* global describe, it, before */
var expect = require('expect.js');
var requirejs = require('requirejs');

requirejs.config({
    baseUrl: 'public/js/app'
});

describe('interaction reducer', function () {
    before(function (done) {
        requirejs(['interaction/reducer', 'interaction/actions'], function (Reducer, Actions) {
            this.Reducer = Reducer;
            this.Actions = Actions;
            done();
        }.bind(this))
    });

    it('should save selected item', function () {
        var result = this.Reducer(null, { type: this.Actions.selectInteractionItem.IN_PROGRESS, value: 'action1'});

        expect(result.selectedItem).to.eql('action1');
    });
});