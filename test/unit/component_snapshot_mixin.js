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

        jest.setTimeout(usecases.length * 10 * 1000) // 10 seconds per usecase

        for (let usecase of usecases) {
            describe(`usecase ${usecase.uniqueID}`, () => {
                it('matches existing snapshot', async () => {
                    const page = await browser.newPage()
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
                    if (usecase.data.setup) {
                        await usecase.data.setup()
                    }
                    const image = await page.screenshot()
                    try {
                        expect(image).toMatchImageSnapshot({ customSnapshotIdentifier: `${component.name}-${usecase.uniqueID}` })
                    } catch (error) {
                        const formattedUsecase = Object.keys(usecase)
                            .sort((a, b) => a.localeCompare(b))
                            .map(key => {
                                const value = typeof usecase[key] === 'object' ? JSON.stringify(usecase[key]).trim('"') : usecase[key]
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
        for (let usecase of usecases) {
            const Constructor = Vue.extend(component)
            const vm = new Constructor({
                propsData: usecase.data,
            })
            describe(usecase.uniqueID, () => {
                for (let computedName in component.computed) {
                    it (computedName, () => {
                        expect(vm[computedName]).toMatchSnapshot()
                    })
                }
            })
        }
    })
}
