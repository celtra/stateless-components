module.exports = {
    'clicking an item should make it checked': function (browser) {
        const devServer = browser.globals.devServerURL

        browser
            .url(devServer + '/#/Multiselect')
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('.multiselect')
            .assert.elementCount('.checkbox-element__check-row--checked', 0)
            .click('.checkbox-element__check-row[title="Location direction clicks"]')
            .pause(200)
            .assert.elementCount('.checkbox-element__check-row--checked', 1)
            .click('.checkbox-element__check-row[title="Locator list views"]')
            .pause(200)
            .assert.elementCount('.checkbox-element__check-row--checked', 2)
            .end()
    },
}
