var votePage = require('../../pageObjects/vote.page.js');
var EC = protractor.ExpectedConditions;
var random = require('random-js')();

describe('should vote in the poll', function () {
    it('should open vote page', function () {
        votePage.openInteraction('demo-vote')
    });

    it('should vote page', function () {
        var lot = random.integer(0, 1);
        var hamilton = element(by.id('voteHamilton'));
        var vettel = element(by.id('voteVettel'));

        if(lot) {
            hamilton.click();
        } else {
            vettel.click();
        }

    });

    it('should check if confirmation message is displayed', function() {
        browser.wait(EC.visibilityOf(votePage.oneMoreTime));
        expect(votePage.oneMoreTime.isPresent()).toBe(true);
        votePage.openInteraction('demo-vote')
    });


    it('should display that user has took part in poll', function() {
        expect(votePage.oneMoreTime.isPresent()).toBe(true);
        votePage.oneMoreTime.click();
    });

    it('should not display thank after restart', function() {
        expect(votePage.oneMoreTime.isPresent()).toBe(false);
    });
});