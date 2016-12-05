var Page = require('astrolabe').Page;
var random = require('random-js')();
var EC = protractor.ExpectedConditions;

module.exports = Page.create({
    url: {value: browser.params.vote.winner},

    tychyOption: {
        get: function () {
            return this.findElement(this.by.css('[value="tychy"]'));
        }
    },
    niepolomiceOption: {
        get: function () {
            return this.findElement(this.by.css('[value="niepolomice"]'));
        }
    },
    voteOptions: {
        get: function() {
            return element.all(by.css('.question__buttons'));
        }
    },
    thankYou: {
        get: function () {
            return element(by.css('.vote-thank-you'));
        }
    },

    voteInNextMinute: {
        get: function () {
            return element(by.css('#voteInNextMinute'));
        }
    },

    answerCorrect: {
        get: function () {
            return element(by.css('.answer--correct'));
        }
    },

    answerMiss: {
        get: function () {
            return element(by.css('.answer--miss'));
        }
    },

    oneMoreTime: {
        get: function () {
            return element(by.id('oneMoreTime'));
        }
    },

    radioAnswer: {
        get: function () {
            return element.all(by.css('md-radio-button'));
        }
    },
    // methods

    voteRandom: {
        value: function (answers) {
            var answer = random.integer(0, answers - 1);

            this.radioAnswer.get(answer).click();
        }
    },

    vote: {
        value: function (answerIndex) {
            this.radioAnswer.get(answerIndex).click();
        }
    },

    openInteraction: {
        value: function(path) {
            browser.ignoreSynchronization = true;
            browser.get(path);
            browser.wait(EC.visibilityOf( element(by.css('.interaction'))));
        }
    }
});