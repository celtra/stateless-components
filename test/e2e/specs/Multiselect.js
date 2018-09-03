module.exports = {
    'clicking an item should make it checked': function (browser) {
        const devServer = browser.globals.devServerURL

        browser
            .url(devServer + '/#/Multiselect')
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('.multiselect')
            .assert.elementCount('.checkbox-element__check-row--checked', 0)
            .click('.checkbox-element__check-row[title="Date (UTC)"]')
            .pause(500)
            .assert.elementCount('.checkbox-element__check-row--checked', 1)
            .click('.checkbox-element__check-row[title="Year (UTC)"]')
            .pause(500)
            .assert.elementCount('.checkbox-element__check-row--checked', 2)
            .end()
    },
}
