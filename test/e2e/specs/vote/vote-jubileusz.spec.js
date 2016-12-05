var votePage = require('../../pageObjects/vote.page.js');
const ANSWERS = 3;

describe('should vote in the poll', function () {
	it('should open vote page', function () {
		votePage.go();
	});

	it('should vote page', function () {
        votePage.voteRandom(ANSWERS);
	});

	it('should check if confirmation message is displayed', function() {
		expect(votePage.thankYou.isPresent()).toBe(true);
		votePage.go();
	});

	it('should answer wrong and check if prompt is displayed', function() {
		expect(votePage.thankYou.isPresent()).toBe(false);
        votePage.vote(0);
        expect(votePage.answerMiss.isPresent()).toBe(true);
        votePage.oneMoreTime.click();
	});

	it('should not display thank after restart', function() {
        votePage.vote(1);
        expect(votePage.answerCorrect.isPresent()).toBe(true);
	});

    it('should answer wrong and check if prompt is displayed', function() {
        votePage.go();
        votePage.vote(2);
        expect(votePage.answerMiss.isPresent()).toBe(true);
    });
});