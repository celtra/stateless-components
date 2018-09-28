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
        server.url = `http://${host}:${port}`

        const compilePromise = new Promise((resolve, reject) => {
            compiler.plugin('done', resolve)
        })

        const serverPromise = new Promise((resolve, reject) => {
            return server.listen(port, host, (error) => {
                error ? reject(error) : resolve()
            })
        })

        return Promise.all([compilePromise, serverPromise]).then(() => server)
    })
}

const { toMatchImageSnapshot } = require('jest-image-snapshot')
expect.extend({ toMatchImageSnapshot })

const puppeteer = require('puppeteer')

const library = require('../../../src/library.js')
import { getFlatUsecases } from '../../../src/component_utils'

jest.setTimeout(30 * 1000)

const encodeUsecase = (usecase) => {
    return Object.keys(usecase)
        .sort((a, b) => a.localeCompare(b))
        .filter(key => typeof usecase[key] !== 'function')
        .map(key => {
            const value = typeof usecase[key] === 'object' ? JSON.stringify(usecase[key]).trim('"') : usecase[key]
            return `${key}=${value}`
        })
        .join('&')
}

const formatUsecase = (usecase) => {
    return Object.keys(usecase)
        .sort((a, b) => a.localeCompare(b))
        .map(key => {
            const value = typeof usecase[key] === 'object' ? JSON.stringify(usecase[key]).trim('"') : usecase[key]
            return `${key}: ${value}`
        }).join('\n')
}

const getHash = (s) => {
    var a = 1, c = 0, h, o
    if (s) {
        a = 0
        for (h = s.length - 1; h >= 0; h--) {
            o = s.charCodeAt(h)
            a = (a<<6&268435455) + o + (o<<14)
            c = a & 266338304
            a = c!==0?a^c>>21:a
        }
    }
    return String(a)
}

describe('ImageSnapshot', () => {
    let browser, server
    beforeAll(async () => {
        browser = await puppeteer.launch()
        server = await runServer()
    })

    for (let componentName in library) {
        const component = library[componentName]
        const usecases = getFlatUsecases(component)
        for (let usecase of usecases) {
            const queryString = encodeUsecase(usecase)
            const queryHash = getHash(queryString)
            describe(`${componentName}: usecase ${queryHash}`, () => {
                it('matches existing snapshot', async () => {
                    const page = await browser.newPage()
                    await page.goto(`${server.url}/#/${componentName}?${queryString}`)
                    if (usecase.setup) {
                        await usecase.setup()
                    }
                    const image = await page.screenshot()
                    try {
                        expect(image).toMatchImageSnapshot({ customSnapshotIdentifier: `${componentName}-${queryHash}` })
                    } catch (error) {
                        error.message += `\n${formatUsecase(usecase)}`
                        throw error
                    }
                })
            })
        }
    }

    afterAll(async () => {
        await browser.close()
        await server.close()
    })
})
