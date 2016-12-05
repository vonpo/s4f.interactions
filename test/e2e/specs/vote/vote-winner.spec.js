var votePage = require('../../pageObjects/vote.page.js');
var EC = protractor.ExpectedConditions;
var random = require('random-js')();
describe('should vote in the poll', function () {
	it('should open vote page', function () {
		votePage.go();
	});

	it('should vote page', function () {
		var lot = random.integer(0, 1);
		var vote = votePage.voteOptions.get(lot);

		vote.click();
	});

	it('should check if confirmation message is displayed', function() {
        browser.wait(EC.visibilityOf(votePage.thankYou));
		expect(votePage.thankYou.isPresent()).toBe(true);
		votePage.go();
	});


	it('should display that user has took part in poll', function() {
		expect(votePage.thankYou.isPresent()).toBe(true);
		votePage.oneMoreTime.click();
	});

	it('should not display thank after restart', function() {
		expect(votePage.thankYou.isPresent()).toBe(false);
	});
});