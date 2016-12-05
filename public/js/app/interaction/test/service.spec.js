/* global describe, it, before */
var expect = require('expect.js');
var requirejs = require('requirejs');

requirejs.config({
    baseUrl: 'public/js/app',
    paths: {
        storage: 'storage/storage'
    }
});


describe('interaction service', function () {
    before(function (done) {
        requirejs(['interaction/service'], function (Service) {
            this.Service = Service;
            done();
        }.bind(this))
    });

    it('should return true if tempVote is not set', function (done) {
        this.Service
            .triggerWhenCanVote()
            .then(function(result) {
                expect(result).to.be(true);
                done();
            })
            .catch(function () {
                expect(true).to.equal(false);
                done();
            })
    });

    it('should check if canVote is set correctly', function (done) {
        var tempVote = {
            answer: {
                time: Date.now()
            }
        };

        this.Service
            .triggerWhenCanVote(tempVote)
            .then(function(result) {
                expect(result).to.be(true);
                done();
            })
            .catch(function () {
                expect(true).to.equal(false);
                done();
            });
    });
});