<template>
    <div>
        <div v-for="(columns, rowIndex) in rows" :key="rowIndex">
            <examples-table :columns="columns">
                <div slot-scope="{ item, columnIndex, itemIndex }" :class="$style.boundingBox">
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
            const relevance = {
                theme: 20,
                size: 10,
            }
            const groupByNames = props.filter(x => !Object.keys(this.filters).concat([this.modelName]).includes(x)).sort((a, b) => {
                const relevanceA = relevance[a] || 0
                const relevanceB = relevance[b] || 0
                const difference = relevanceB - relevanceA
                if (difference === 0) {
                    return this.valuesByName[b].length - this.valuesByName[a].length
                } else {
                    return difference
                }
            })
            let columnProp = maxBy(groupByNames.filter(name => this.valuesByName[name].length <= 3 && name !== 'usecaseName'), x => x.length)
            let rowProp = maxBy(groupByNames.filter(name => name !== columnProp && name !== 'usecaseName'), x => x.length)

            let product = 1
            Object.values(this.valuesByName).forEach(values => product *= values.length)

            if (columnProp) {
                if (Math.round(product / this.valuesByName[columnProp].length) < 4) {
                    columnProp = null
                }
            }

            if (rowProp) {
                if (Math.round(product / this.valuesByName[rowProp].length) < 4) {
                    rowProp = null
                }
            }

            return {
                column: columnProp,
                row: rowProp,
            }
        },
        flatUsecases () {
            const allVariations = this.component.variations
            const allNames = this.component.usecases.map(x => x.name)

            const remainingValues = _.pickBy(this.valuesByName, (value, name) => {
                return !Object.keys(this.filters).concat([this.modelName, this.splitByProp.column, this.splitByProp.row]).includes(name)
            })

            const flat = []
            for (const variation of getFlatVariations(remainingValues)) {
                const usecase = this.component.usecases.find(x => x.name === variation.usecaseName)
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

            return flat
        },
        rows () {
            const themesCss = {
                white: { backgroundColor: 'white', color: 'black' },
                light: { backgroundColor: '#f2f2f3', color: 'black' },
                dark: { backgroundColor: '#1f1f2c', color: 'white' },
            }

            const relevantUsecases = this.flatUsecases.filter(usecase => {
                if (this.component.variations && this.component.variations[this.modelName]) {
                    if (!this.filters[this.modelName] && usecase.variation[this.modelName] !== this.component.variations[this.modelName][0]) {
                        // return false
                    }
                }

                for (const prop in this.filters) {
                    console.log(usecase.variation, prop)
                    console.log(usecase.variation[prop])
                    if (usecase.variation[prop] !== this.filters[prop]) {
                        //return false
                    }
                }
                return true
            })

            // Ignore usecase if it only has a different model prop
            const filteredUsecases = []
            const existingUsecaseIds = {}
            for (const usecase of relevantUsecases) {
                if (!existingUsecaseIds[usecase.name]) {
                    existingUsecaseIds[usecase.name] = true
                    filteredUsecases.push(usecase.variation)
                }
            }

            const rowValues = this.splitByProp.row ? this.valuesByName[this.splitByProp.row] : [null]
            const columnValues = this.splitByProp.column ? this.valuesByName[this.splitByProp.column] : [null]
            return rowValues.map((rowValue, rowIndex) => {
                const columnItems = [
                    {
                        title: this.rowProp ? getPropTitle(this.splitByProp.row, rowValue) : null,
                        content: this.flatUsecases.map(usecase => usecase.name),
                    },
                    ...columnValues.map((columnValue, index) => {
                        return {
                            title: getPropTitle(this.splitByProp.column, columnValue),
                            // content: filteredUsecases.filter(x => (rowValue === null || x[this.splitByProp.row] === rowValue) && (columnValue === null || x[this.splitByProp.column] === columnValue)),
                            content: filteredUsecases,
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
