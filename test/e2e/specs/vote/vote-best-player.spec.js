/* global describe, it, browser, protractor */

var votePage = require('../../pageObjects/vote-best-player.page');
var randomString = require('random-string');
var random = require('random-js')();
var facebookLoginpage = require('../../pageObjects/facebookLogin.page');
var EC = protractor.ExpectedConditions;

describe('should vote in the poll', function () {
    it('should open vote page', function () {
        votePage.go();
    });

    it('should select player and open dialog with reason', function () {
        votePage.selectPlayer(random.integer(0, 11));
        browser.wait(EC.visibilityOf(votePage.enterReasonDialog));
        expect(votePage.enterReasonDialog.isPresent()).toBe(true);
    });

    it('should enter reason', function () {
        expect(votePage.saveAnswerButton.isPresent()).toBe(false);
        votePage.reasonInput.sendKeys(randomString({length: random.integer(10, 100)}));
        votePage.saveAnswerButton.click();
    });

    it('should display registration page', function () {
        expect(votePage.voteByFacebookButton.isPresent()).toBe(true);

        votePage.firstNameInput.sendKeys('firstName' + random.integer(100, 1000));
        votePage.lastNameInput.sendKeys('lastName' + random.integer(100, 1000));
        votePage.emailInput.sendKeys('email' + random.integer(100, 1000) + '@wp.pl');

        expect(votePage.registerUserButton.isPresent()).toBe(true);
        votePage.registerUserButton.click();
    });

    it('should check if confirmation message is displayed', function () {
        expect(votePage.thankYou.isPresent()).toBe(true);
        votePage.oneMoreTime.click();
    });

    it('should register vote by facebook', function () {
        votePage.selectPlayer(random.integer(0, 11));
        browser.wait(EC.visibilityOf(votePage.enterReasonDialog));
        expect(votePage.enterReasonDialog.isPresent()).toBe(true);
    });

    it('should enter reason', function () {
        expect(votePage.saveAnswerButton.isPresent()).toBe(false);
        votePage.reasonInput.sendKeys(randomString({length: random.integer(10, 100)}));
        votePage.saveAnswerButton.click();
    });

    it('should display registration page', function () {
        votePage.voteByFacebookButton.click();
    });

    it('should switch to facebook window', function () {
        browser.ignoreSynchronization = true;
        facebookLoginpage.email.sendKeys(browser.params.user.facebook.name);
        facebookLoginpage.password.sendKeys(browser.params.user.facebook.password);
        facebookLoginpage.loginButton.click();
        browser.sleep(browser.params.timeouts.small);
    });

    it('go back to vote page', function () {
        browser.wait(EC.visibilityOf(votePage.thankYou));
        expect(votePage.thankYou.isPresent()).toBe(true);
        browser.refresh();
        browser.sleep(browser.params.timeouts.big);
    });

    it('should check if confirmation message is displayed', function () {
        browser.ignoreSynchronization = false;
        browser.wait(EC.visibilityOf(votePage.thankYou));
        expect(votePage.thankYou.isPresent()).toBe(true);
    });
});