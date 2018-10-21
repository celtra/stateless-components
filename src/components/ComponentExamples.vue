<template>
    <div>
        <div v-for="(columns, rowIndex) in rows" :key="rowIndex">
            <examples-table :columns="columns">
                <div slot-scope="item" :class="$style.boundingBox">
                    <component-example
                        :class="$style.component"
                        :key="item.name"
                        :component="component"
                        v-bind="item"
                        :theme="filters.theme || item.theme || 'light'"
                        :value="syncValue"
                        @input="(v) => useSyncValue && (syncValue = v)">
                    </component-example>
                </div>
            </examples-table>
        </div>
    </div>
</template>

<script>
import { getFlatUsecases, getFlatVariations } from '../component_utils'
import { kebabCase } from 'lodash'
import ExamplesTable from './ExamplesTable.vue'
import ComponentExample from './ComponentExample.vue'
import { maxBy, pickBy } from 'lodash'
import { getPropTitle } from './utils'
import { filter } from '../stateless/items_utils'

export default {
    components: {
        ExamplesTable,
        ComponentExample,
    },
    props: {
        component: { type: Object, required: true },
        filters: { type: Object, default: () => ({}) },
        showBoundingBoxes: { type: Boolean, default: false },
        useSyncValue: { type: Boolean, default: false },
    },
    data () {
        return {
            syncValue: null,
        }
    },
    computed: {
        modelName () {
            return this.component.model && this.component.model.prop || 'value'
        },
        valuesByName () {
            // copied from ComponentPage.componentVariations
            const variations = this.component && { ...this.component.variations } || {}
            if (this.component.usecases[0].name) {
                variations.usecaseName = this.component.usecases.map(usecase => usecase.name)
            }
            return variations
        },
        splitByProp () {
            const props = this.valuesByName ? Object.keys(this.valuesByName) : []
            const relevances = {
                theme: 2,
                size: 1,
            }
            const names = props.filter(x => !Object.keys(this.filters).concat([this.modelName]).includes(x))
            let columnProp = maxBy(names.filter(name => this.valuesByName[name].length <= 3 && name !== 'usecaseName'), x => {
                const relevance = (relevances[x] || 0)
                const length = this.valuesByName[x].length
                return relevance * 1000 + length
            })
            let rowProp = maxBy(names.filter(name => name !== columnProp && name !== 'usecaseName'), x => {
                const relevance = (relevances[x] || 0)
                const length = this.valuesByName[x].length
                return relevance * 1000 + length
            })

            let product = 1
            Object.values(this.valuesByName).forEach(values => product *= values.length)

            if (columnProp) {
                if (Math.round(product / this.valuesByName[columnProp].length) < 4) {
                    columnProp = null
                } else {
                    product /= this.valuesByName[columnProp].length
                }
            }

            if (rowProp) {
                if (Math.round(product / this.valuesByName[rowProp].length) < 4) {
                    rowProp = null
                }
            }

            const remainingValues = _.pickBy(this.valuesByName, (value, name) => {
                return !Object.keys(this.filters).concat([this.modelName, columnProp, rowProp]).includes(name)
            })

            const flat = []
            for (const variation of getFlatVariations(remainingValues)) {
                const usecase = this.component.usecases.find(x => x.name === (variation.usecaseName || this.filters.usecaseName))
                const variationSuffix = Object.keys(variation).map(key => {
                    const propData = this.component.props[key]
                    if (!propData) {
                        return null
                    }
                    if (propData.type === Boolean) {
                        return variation[key] ? key : null
                    }
                }).filter(x => x).join(', ')
                flat.push({
                    name: `${usecase.name} ${variationSuffix}`,
                    variation: { ...variation, ...usecase },
                })
            }

            return {
                column: columnProp,
                row: rowProp,
                flat: flat,
            }
        },
        rows () {
            const themesCss = {
                white: { backgroundColor: 'white', color: 'black' },
                light: { backgroundColor: '#f2f2f3', color: 'black' },
                dark: { backgroundColor: '#1f1f2c', color: 'white' },
            }

            const rowValues = this.splitByProp.row ? this.valuesByName[this.splitByProp.row] : [null]
            const columnValues = this.splitByProp.column ? this.valuesByName[this.splitByProp.column] : [null]
            return rowValues.map((rowValue, rowIndex) => {
                const columnItems = [
                    {
                        title: getPropTitle(this.splitByProp.row, rowValue, true),
                        content: this.splitByProp.flat.map(usecase => usecase.name),
                    },
                    ...columnValues.map((columnValue, index) => {
                        return {
                            title: getPropTitle(this.splitByProp.column, columnValue),
                            content: this.splitByProp.flat.map(x => ({
                                ...x.variation,
                                [this.splitByProp.row]: rowValue,
                                [this.splitByProp.column]: columnValue,
                                [null]: 1,
                            })),
                            themeCss: this.splitByProp.column === 'theme' && themesCss[columnValue] || this.splitByProp.row === 'theme' && themesCss[rowValue] || themesCss.light,
                        }
                    }),
                ]
                return columnItems
            })
        },
    },
    methods: {
        getItem () {

        },
    },
}
</script>

<style lang="less" module>
.component {

}

.boundingBox {
}
</style>
