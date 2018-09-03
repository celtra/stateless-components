module.exports = {
    'dragging the handle to the right should set max value': function (browser) {
        const devServer = browser.globals.devServerURL

        browser
            .url(devServer + '/#/Slider')
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('.slider')
            .moveToElement('.slider-rail__handle', 0, 0)
            .mouseButtonDown(0)
            .moveToElement('body', 1000, 0)
            .mouseButtonUp(0)
            .assert.attributeEquals('.input-row__placeholder-text', 'value', '20')
            .end()
    },
    'dragging the handle to the left should set min value': function (browser) {
        const devServer = browser.globals.devServerURL

        browser
            .url(devServer + '/#/Slider')
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('.slider')
            .moveToElement('.slider-rail__handle', 0, 0)
            .mouseButtonDown(0)
            .moveToElement('body', 0, 0)
            .mouseButtonUp(0)
            .assert.attributeEquals('.input-row__placeholder-text', 'value', '1')
            .end()
    },
    /*'typing min value in the input should move handle to the left': function (browser) {
        const devServer = browser.globals.devServerURL

        browser
            .url(devServer + '/#/Slider')
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('.slider')
            .setValue('input[type=text]', '1.0')
            .pause(1000)
            .assert.attributeEquals('.rail__handle', 'style', 'left: 0px;')
            .end()
    },*/
}
