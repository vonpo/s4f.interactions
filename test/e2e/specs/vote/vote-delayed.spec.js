var votePage = require('../../pageObjects/vote.page.js');
var EC = protractor.ExpectedConditions;
var random = require('random-js')();

describe('should vote in the poll', function () {
	it('should open vote page', function () {
		votePage.openInteraction('gkskatowice-test?redirect=false')
	});

	it('should vote page', function () {
		var lot = random.integer(0, 2);
		var vote = votePage.voteOptions.get(lot);
		vote.click();
	});

	it('should show vote in next minute', function () {
		browser.wait(EC.visibilityOf(votePage.voteInNextMinute));
		expect(votePage.voteInNextMinute.isPresent()).toBe(true);
	});

	it('should check if confirmation message is displayed', function() {
		browser.wait(EC.visibilityOf(votePage.oneMoreTime));
		expect(votePage.oneMoreTime.isPresent()).toBe(true);
		votePage.openInteraction('gkskatowice-test?redirect=false')
	});

	it('should display that user has took part in poll', function() {
		expect(votePage.oneMoreTime.isPresent()).toBe(true);
		votePage.oneMoreTime.click();
	});

	it('should not display thank after restart', function() {
		expect(votePage.oneMoreTime.isPresent()).toBe(false);
	});
});