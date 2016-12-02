/* global describe, it, before */
var expect = require('expect.js');
var requirejs = require('requirejs');

requirejs.config({
    baseUrl: 'public/js/app'
});

describe('url test', function () {
    before(function (done) {
        requirejs(['url/service'], function (UrlService) {
            this.UrlService = UrlService;
            done();
        }.bind(this))
    });

    it('should check empty url1', function () {
        var result = this.UrlService.extractUrl('/');

        expect(result).to.eql([]);
    });

    it('should check empty url2', function () {
        var result = this.UrlService.extractUrl();

        expect(result).to.eql([]);
    });

    it('should check url1', function () {
        var result = this.UrlService.extractUrl('/gkskatowice');

        expect(result).to.eql(['gkskatowice']);
    });

    it('should check url2', function () {
        var result = this.UrlService.extractUrl('/gkskatowice/test');

        expect(result).to.eql(['gkskatowice', 'test']);
    });
});