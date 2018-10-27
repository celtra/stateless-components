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

    extractFromConfiguration (data, opts) {
        const keys = Object.keys(data)
        const names = keys.map(key => {
            const value = data[key]
            if (this.valuesByName[key].length === 1) {
                return null
            }
            if (key !== 'usecaseName') {
                return this._getPropTitle(key, value, { ...opts, hideNot: keys.length > 1 })
            }
            const propData = this.component.props[key]
            if (!propData) {
                return null
            }

            if (propData.type === Boolean) {
                return value ? kebabCase(key) : null
            }
            return value
        })

        const configurationKey = [this.component.metaName].concat(Object.keys(data).sort().map(x => this.valuesByName[x].indexOf(data[x]))).join('-')

        return {
            name: names.filter(x => x).join(', ') || ' ',
            key: configurationKey,
        }
    }

    _getPropTitle (name, value, { addName: addName = false, hideNot: hideNot = false } = {}) {
        const kebabName = kebabCase(name)
        let res = ''
        if (typeof value === 'boolean' || this.component.props[name] && this.component.props[name].type === Boolean) {
            res = (typeof value === 'undefined' || value === true ? kebabName : (hideNot ? '' : `not ${kebabName}`))
        } else if (typeof value === 'undefined') {
            res = kebabName
        } else {
            res = value ? (addName ? `${value} ${kebabName}` : value) : ''
        }

        res = res.toUpperCase().trim(' ')

        if (res.length === 0) {
            return null
        }
        return res
    }
}
