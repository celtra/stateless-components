'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('./webpack.library.conf')

const spinner = ora('building library...')
spinner.start()

webpack(webpackConfig, (err, stats) => {
    spinner.stop()

    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        chunks: false,
        chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
        console.log(chalk.red('  Library build failed with errors.\n'))
        process.exit(1)
    }

    console.log(chalk.cyan('  Library build complete.\n'))
})
