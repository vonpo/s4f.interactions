var Page = require('astrolabe').Page;

module.exports = Page.create({
	url: {value: browser.params.vote.bestPlayer},

	players: {
		get: function () {
			return element.all(by.css('md-radio-button'));
		}
	},
	enterReasonDialog: {
		get: function () {
			return element(by.css('.md-dialog-content'));
		}
	},

	registerUserButton: {
		get: function() {
			return element(by.css('[ng-click="click()"]'));
		}
	},

	oneMoreTime: {
		get: function () {
			return element(by.id('oneMoreTime'));
		}
	},

	thankYou: {
		get: function() {
			return element(by.css('.vote-thank-you'));
		}
	},

	voteByFacebookButton: {
		get: function() {
			return element(by.css('[ng-click="Vote.registerVoteByFacebook()"]'));
		}
	},

	firstNameInput: {
		get: function() {
			return element(by.css('[ng-model="Vote.user.firstName"]'));
		}
	},

	lastNameInput: {
		get: function() {
			return element(by.css('[ng-model="Vote.user.lastName"]'));
		}
	},

	emailInput: {
		get: function() {
			return element(by.css('[ng-model="Vote.user.email"]'));
		}
	},

	saveAnswerButton: {
		get: function() {
			return element(by.css('[l-click="Vote.saveAnswer()"]'));
		}
	},

	reasonInput: {
		get: function() {
			return element(by.css('[name="userAnswer"]'));
		}
	},

	//methods
	selectPlayer: {
		value: function (index) {
			this.players.get(index).click();
		}
	}
});