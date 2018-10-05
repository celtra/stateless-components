import { toMatchImageSnapshot } from 'jest-image-snapshot'
expect.extend({ toMatchImageSnapshot })
import { getFlatUsecases } from '../../src/component_utils'
import Vue from 'vue'
import puppeteer from 'puppeteer-core'

export default function testSnapshots (component) {
    describe('rendered image', () => {
        const fs = require('fs')
        const path = require('path')
        const compiledScript = fs.readFileSync(path.join(__dirname, '../../dist/view.js'))

        let browser
        beforeAll(async () => {
            browser = await puppeteer.launch({
                executablePath: '/usr/bin/chromium-browser', // Available inside Docker container
                args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-setuid-sandbox'],
            })
        })

        const usecases = getFlatUsecases(component)

        jest.setTimeout(usecases.length * 20 * 1000)

        for (const usecase of usecases) {
            describe(`usecase ${usecase.uniqueID}`, () => {
                it('matches existing snapshot', async () => {
                    const page = await browser.newPage()

                    const errors = []
                    page.on('error', e => errors.push(e))
                    page.on('pageerror', e => errors.push(e))

                    page.setContent(`
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="utf-8">
                            <meta name="viewport" content="width=device-width,initial-scale=1.0">
                        </head>
                        <body>
                            <div id="app"></div>
                            <script>${compiledScript}</script>
                            <script>setComponent('${component.name}', ${JSON.stringify(usecase.data)})</script>
                        </body>
                        </html>
                    `)

                    await page.waitForSelector('#container')

                    if (component.setup) {
                        await component.setup()
                    }

                    let image
                    if (component.hasAbsolutePosition) {
                        image = await page.screenshot()
                    } else {
                        const containerElement = await page.$('#container')
                        image = await containerElement.screenshot()
                    }

                    for (const error of errors) {
                        console.log(error)
                    }

                    try {
                        expect(image).toMatchImageSnapshot({ customSnapshotIdentifier: `${component.name}-${usecase.uniqueID}` })
                    } catch (error) {
                        const formattedUsecase = Object.keys(usecase.data)
                            .sort((a, b) => a.localeCompare(b))
                            .map(key => {
                                const value = typeof usecase.data[key] === 'object' ? JSON.stringify(usecase.data[key]).trim('"') : usecase.data[key]
                                return `${key}: ${value}`
                            }).join('\n')
                        throw new Error(error.message + `\n${formattedUsecase}`)
                    }
                })
            })
        }

        afterAll(async () => {
            await browser.close()
        })
    })

    describe('computed', () => {
        const usecases = getFlatUsecases(component, ['theme', 'size'])
        for (const usecase of usecases) {
            const Constructor = Vue.extend(component)
            const vm = new Constructor({
                propsData: usecase.data,
            })
            describe(usecase.uniqueID, () => {
                for (const computedName in component.computed) {
                    it (computedName, () => {
                        expect(vm[computedName]).toMatchSnapshot()
                    })
                }
            })
        }
    })
}
