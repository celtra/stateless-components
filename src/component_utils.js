import { kebabCase } from 'lodash'

export default class ComponentConfigurations {
    constructor (component) {
        this.component = component

        const valuesByName = this.component && { ...this.component.variations } || {}
        if (this.component.usecases[0].name) {
            valuesByName.usecaseName = this.component.usecases.filter(usecase => !usecase.testOnly).map(usecase => usecase.name)
        }
        this.valuesByName = valuesByName
    }

    getCombinations (ignoreNames = []) {
        let flat = [{}]

        for (const key of Object.keys(this.valuesByName).sort()) {
            if (!ignoreNames.includes(key)) {
                let newFlat = []
                for (const value of this.valuesByName[key]) {
                    newFlat = newFlat.concat(flat.map(item => {
                        return { ...item, [key]: value }
                    }))
                }
                flat = newFlat
            }
        }

        return flat.map(data => {
            return { data: data, ...this.extractFromConfiguration(data) }
        })
    }

    extractFromConfiguration (data, opts = {}) {
        const names = Object.keys(data).sort()

        const nameParts = names.map(name => {
            const value = data[name]
            if (this.valuesByName[name].length === 1) {
                return null
            }

            const hideNot = names.length > 1

            const kebabName = kebabCase(name)
            let res = ''
            if (value === null || typeof value === 'boolean' || this.component.props[name] && this.component.props[name].type === Boolean) {
                res = (typeof value === 'undefined' || value === true ? kebabName : (hideNot ? '' : `not ${kebabName}`))
            } else if (typeof value === 'undefined') {
                res = kebabName
            } else {
                res = value ? (opts.addName ? `${value} ${kebabName}` : value) : ''
            }

            res = res.trim(' ')

            if (res.length === 0) {
                return null
            }
            return res
        }).filter(x => x)

        const configurationKey = [this.component.metaName].concat(names.map(x => this.valuesByName[x].indexOf(data[x]))).join('-')

        return {
            name: nameParts.join(', ') || ' ',
            key: configurationKey,
        }
    }
}
