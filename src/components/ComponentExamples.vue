<template>
    <div>
        <div :class="$style.filters">
            <icon :class="$style.resetFilters" name="x-bold" @click="$emit('reset-filters')" />
            <chip
                v-for="(values, name) in valuesByName"
                v-if="name !== 'value'"
                :is-removable="name in filters"
                :key="name"
                :label="getFilterTitle(name)"
                :is-active="name in filters"
                :theme="filters.theme || 'light'"
                :class="$style.propInfo"
                @click="cycleFilter(name)"
                @remove="removeFilter(name)"
            />
        </div>

        <div v-for="(columns, rowIndex) in rows" :key="rowIndex">
            <div :class="$style.table">
                <div v-if="columns[0].rowTitle" :class="$style.rowTitle">{{ columns[0].rowTitle }}</div>
                <examples-table :columns="columns" :style="columns[0].themeCss">
                    <div slot-scope="item" :class="$style.boundingBox" class="bounding-box">
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
    </div>
</template>

<script>
import { getFlatUsecases, getFlatVariations } from '../component_utils'
import { kebabCase } from 'lodash'
import ExamplesTable from './ExamplesTable.vue'
import ComponentExample from './ComponentExample.vue'
import { maxBy, pickBy } from 'lodash'
import { filter } from '../stateless/items_utils'
import Icon from '@/stateless/icon.vue'
import Chip from '@/stateless/Chip.vue'

function getPropTitle (name, value, { addName: addName = false, hideNot: hideNot = false } = {}) {
    const kebabName = kebabCase(name)
    let res = ''
    if (typeof value === 'boolean') {
        res = (value ? kebabName.toUpperCase() : (hideNot ? '' : `not ${kebabName}`.toUpperCase()))
    } else if (typeof value === 'undefined') {
        res = kebabName.toUpperCase()
    } else {
        res = value ? (addName ? `${value} ${kebabName}` : value).toUpperCase() : ''
    }

    res = res.trim(' ')

    if (res.length === 0) {
        return null
    }
    return res
}

export default {
    components: {
        ExamplesTable,
        ComponentExample,
        Icon,
        Chip,
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
            const props = this.valuesByName ? Object.keys(this.valuesByName).filter(key => !(key in this.filters)) : []

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
                const variationKeys = Object.keys(variation)
                const variationNames = variationKeys.map(key => {
                    if (key !== 'usecaseName') {
                        return getPropTitle(key, variation[key], { hideNot: variationKeys.length > 1 })
                    }
                    const propData = this.component.props[key]
                    if (!propData) {
                        return null
                    }
                    const value = variation[key]
                    if (propData.type === Boolean) {
                        return value ? kebabCase(key) : null
                    }
                    return value
                })
                const usecase = this.component.usecases.find(x => x.name === (variation.usecaseName || this.filters.usecaseName))
                const names = [this.filters.usecaseName ? null : usecase.name].concat(variationNames).filter(x => x)

                flat.push({
                    name: names.length === 0 ? null : names.join(', ').toUpperCase(),
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
            let columnValues = this.splitByProp.column ? this.valuesByName[this.splitByProp.column] : [null]
            if (this.splitByProp.column === 'theme') {
                columnValues = columnValues.slice().sort((a, b) => {
                    const order = ['white', 'light', 'dark']
                    return order.indexOf(a) - order.indexOf(b)
                })
            }
            return rowValues.map((rowValue, rowIndex) => {
                const themeCss = this.filters.theme && themesCss[this.filters.theme] || this.splitByProp.row === 'theme' && themesCss[rowValue]
                const firstColumn = this.splitByProp.flat.some(x => x.name) ? {
                    rowTitle: getPropTitle(this.splitByProp.row, rowValue),
                    content: this.splitByProp.flat.map(usecase => usecase.name),
                    first: true,
                    themeCss: themeCss || themesCss.light,
                } : null
                const columnItems = [
                    ...(!firstColumn ? [] : [firstColumn]),
                    ...columnValues.map((columnValue, index) => {
                        return {
                            title: getPropTitle(this.splitByProp.column, columnValue),
                            content: this.splitByProp.flat.map(x => ({
                                ...x.variation,
                                ...this.filters,
                                [this.splitByProp.row]: rowValue,
                                [this.splitByProp.column]: columnValue,
                            })),
                            themeCss: themeCss || this.splitByProp.column === 'theme' && themesCss[columnValue] || themesCss.light,
                        }
                    }),
                ]
                return columnItems
            })
        },
    },
    methods: {
        cycleFilter (name) {
            const currentValue = this.filters[name]
            const values = this.valuesByName[name]
            const currentIndex = values.indexOf(currentValue)
            const newIndex = (currentIndex + 1) % values.length
            this.$emit('set-filter', name, values[newIndex])
        },
        removeFilter (name) {
            this.$emit('unset-filter', name)
        },
        getFilterTitle (name) {
            if (name === 'usecaseName') {
                return name in this.filters ? this.filters[name].toUpperCase() : 'NAME'
            }
            return getPropTitle(name, this.filters[name], { addName: true })
        },
    },
}
</script>

<style lang="less" module>
.component {

}

.boundingBox {
    width: 100%;
}

.filters {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    background-color: rgba(122, 122, 122, 0.2);
    padding: 10px 20px;
    border-radius: 3px;
}

.resetFilters {
    color: rgba(122, 122, 122, 0.8);
    cursor: pointer;

    &:hover {
        color: rgba(122, 122, 122, 1);
    }
}

.propInfo {
    margin-left: 10px;
}

.table {
    animation: fadeIn 250ms ease-out;
    position: relative;
    margin-top: 40px;
}

@keyframes fadeIn {
    0% { opacity: 0; transform: translateY(20px) scale(1.05); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
}

.rowTitle {
    font-size: 20px;
    background-color: #eee;
    display: inline-block;
    padding: 2px 15px;
    position: absolute;
    top: -25px;
}
</style>
