import Vue from 'vue'
const library = require('../../../src/library.js')
import { getFlatUsecases } from '../../../src/component_utils'

describe('ComputedSnapshot', () => {
    for (let componentName in library) {
        const component = library[componentName]
        const usecases = getFlatUsecases(component, ['theme', 'size'])

        describe(componentName, () => {
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
})
