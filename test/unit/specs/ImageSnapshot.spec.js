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

const puppeteer = require('puppeteer-core')

const library = require('../../../src/library.js')
import { getFlatUsecases } from '../../../src/component_utils'

jest.setTimeout(10 * 60 * 1000)

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

describe('ImageSnapshot', () => {
    let browser, server
    beforeAll(async () => {
        browser = await puppeteer.launch({
            executablePath: '/usr/bin/chromium-browser',
            args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-setuid-sandbox'],
        })
        server = await runServer()
    })

    for (let componentName in library) {
        const component = library[componentName]
        const usecases = getFlatUsecases(component)
        for (let usecase of usecases) {
            const queryString = encodeUsecase(usecase.data)
            describe(`${componentName}: usecase ${usecase.uniqueID}`, () => {
                it('matches existing snapshot', async () => {
                    const page = await browser.newPage()
                    await page.goto(`${server.url}/#/${componentName}?${queryString}`)
                    if (usecase.data.setup) {
                        await usecase.data.setup()
                    }
                    const image = await page.screenshot()
                    try {
                        expect(image).toMatchImageSnapshot({ customSnapshotIdentifier: `${componentName}-${usecase.uniqueID}` })
                    } catch (error) {
                        throw new Error(error.message + `\n${formatUsecase(usecase.data)}`)
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
