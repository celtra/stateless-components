const runServer = () => {
    process.env.NODE_ENV = 'testing'

    const webpack = require('webpack')
    const DevServer = require('webpack-dev-server')
    const devConfigPromise = require('../../../build/webpack.dev.conf')

    return devConfigPromise.then(devConfig => {
        const devServerOptions = devConfig.devServer
        const compiler = webpack({ ...devConfig, stats: 'none', plugins: devConfig.plugins.slice(0, devConfig.plugins.length - 1) })

        const server = new DevServer(compiler, { ...devServerOptions, noInfo: true })
        const port = devServerOptions.port
        const host = devServerOptions.host

        const compilePromise = new Promise((resolve, reject) => {
            compiler.plugin('done', resolve)
        })

        const serverPromise = new Promise((resolve, reject) => {
            return server.listen(port, host, (error) => {
                error ? reject(error) : resolve()
            })
        })

        return Promise.all([compilePromise, serverPromise]).then(() => `http://${host}:${port}`)
    })
}

const { toMatchImageSnapshot } = require('jest-image-snapshot')
expect.extend({ toMatchImageSnapshot })

const puppeteer = require('puppeteer')

const library = require('../../../src/library.js')

jest.setTimeout(1000000000)

const flatVariations = (variations) => {
    let flat = [{}]

    for (let key of Object.keys(variations).sort((a, b) => a.localeCompare(b))) {
        let newFlat = []
        for (let value of variations[key]) {
            newFlat = newFlat.concat(flat.map(item => {
                return { ...item, [key]: value }
            }))
        }
        flat = newFlat
    }

    return flat
}

const encodeVariation = (variation) => {
    return Object.keys(variation)
        .sort((a, b) => a.localeCompare(b))
        .filter(key => typeof variation[key] !== 'function')
        .map(key => {
            const value = typeof variation[key] === 'object' ? JSON.stringify(variation[key]).trim('"') : variation[key]
            return `${key}=${value}`
        })
        .join('&')
}

describe('ImageSnapshot', () => {
    let browser, url
    beforeAll(async () => {
        browser = await puppeteer.launch()
        url = await runServer()
    })

    for (let componentName in library) {
        const component = library[componentName]
        if (component.usecases) {
            let usecases = []
            const variations = component.variations ? flatVariations(component.variations) : [{}]
            for (let variation of variations) {
                for (let usecase of component.usecases) {
                    usecases.push({ ...variation, ...usecase })
                }
            }

            for (let i = 0; i < usecases.length; i++) {
                const usecase = usecases[i]
                const params = encodeVariation(usecase)
                describe(`${componentName}: usecase ${i}`, () => {
                    it('matches existing snapshot', async () => {
                        const page = await browser.newPage()
                        await page.goto(`${url}/#/${componentName}?${params}`)
                        if (usecase.setup) {
                            await usecase.setup()
                        }
                        const image = await page.screenshot()
                        expect(image).toMatchImageSnapshot({ customSnapshotIdentifier: `${componentName}-${i}` })
                    })
                })
            }
        }
    }

    afterAll(async () => {
        await browser.close()
    })
})
