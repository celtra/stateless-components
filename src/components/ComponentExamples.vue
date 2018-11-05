<template>
    <div>
        <div v-for="(columns, rowIndex) in rows" :key="rowIndex">
            <div :class="$style.table">
                <div v-if="columns[0].rowTitle" :class="$style.rowTitle" :style="columns[0].themeCss" @click="onRowClick(rowIndex)">{{ columns[0].rowTitle }}</div>
                <examples-table :columns="columns" :style="columns[0].themeCss" :class="$style.row" @click="onTableClick">
                    <div slot-scope=" { item, rowIndex, columnIndex }" :class="[$style.slotContainer, { [$style.slotContainer_showSnapshot]: showSnapshot }]">
                        <template v-if="typeof item === 'string'">
                            <p :class="$style.flatName">{{ item }}</p>
                        </template>
                        <template v-else-if="typeof item === 'object'">
                            <div :class="$style.boundingBox" class="bounding-box" @click="copyCode">
                                <div v-if="showSnapshot" :class="$style.snapshotImage">
                                    <img :src="`/static/snapshots/images/${component.metaName}__${item.name.replace(/,?\s/g, '-').toLowerCase()}-snap.png`" />
                                </div>
                                <component-example
                                    :class="$style.component"
                                    :style="component.width ? { maxWidth: `${component.width}px` } : {}"
                                    :key="item.key"
                                    :component="component"
                                    v-bind="item"
                                    :column-index="columnIndex"
                                    :row-index="rowIndex"
                                    :theme="filters.theme || item.theme || 'light'"
                                    :sync-value="syncValue"
                                    @input="(v) => useSyncValue && (syncValue = v)"
                                    @event="$emit('event', $event)">
                                </component-example>
                            </div>
                        </template>
                    </div>
                </examples-table>
            </div>
        </div>
    </div>
</template>

<script>
import ComponentConfigurations from '../component_utils'
import { kebabCase } from 'lodash'
import ExamplesTable from './ExamplesTable.vue'
import ComponentExample from './ComponentExample.vue'
import { maxBy, pickBy } from 'lodash'
import { filter } from '../stateless/items_utils'
import Icon from '@/stateless/icon.vue'
import Chip from '@/stateless/Chip.vue'

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
        showSnapshot: { type: Boolean, default: false },
    },
    data () {
        return {
            syncValue: null,
        }
    },
    computed: {
        valuesByName () {
            return this.configurations.valuesByName
        },
        modelName () {
            return this.component.model && this.component.model.prop || 'value'
        },
        splitByProp () {
            const props = this.valuesByName ? Object.keys(this.valuesByName).filter(key => !Object.keys(this.filters).concat([this.modelName]).includes(key)) : []
            let totalCombinations = 1
            props.forEach(name => totalCombinations *= this.valuesByName[name].length)

            const relevances = {
                theme: 2,
                size: 1,
            }

            let columnProp = maxBy(props.filter(name => this.valuesByName[name].length <= 3 && name !== 'usecaseName'), x => {
                const relevance = (relevances[x] || 0)
                const length = this.valuesByName[x].length
                return relevance * 1000 + length
            })
            if (columnProp) {
                if (columnProp !== 'theme' && Math.round(totalCombinations / this.valuesByName[columnProp].length) <= 1) {
                    columnProp = null
                } else {
                    totalCombinations /= this.valuesByName[columnProp].length
                }
            }

            let rowProp = maxBy(props.filter(name => name !== columnProp && name !== 'usecaseName'), x => {
                const relevance = (relevances[x] || 0)
                const length = this.valuesByName[x].length
                return relevance * 1000 + length
            })
            if (rowProp) {
                if (Math.round(totalCombinations / this.valuesByName[rowProp].length) <= 2) {
                    rowProp = null
                }
            }

            return {
                column: columnProp,
                row: rowProp,
                flat: this.configurations.getCombinations(Object.keys(this.filters).concat([this.modelName, columnProp, rowProp])).map(configuration => {
                    const usecase = this.component.usecases.find(u => u.name === configuration.data.usecaseName)
                    return {
                        name: configuration.name,
                        usecase: usecase,
                        configuration: configuration,
                    }
                }),
            }
        },
        rows () {
            const themesCss = {
                white: { priority: 2, backgroundColor: 'white', color: 'black' },
                light: { priority: 1, backgroundColor: '#f2f2f3', color: 'black' },
                dark: { priority: 0, backgroundColor: '#1f1f2c', color: 'white' },
            }

            const rowValues = this.splitByProp.row ? this.valuesByName[this.splitByProp.row] : [null]
            let columnValues = this.splitByProp.column ? this.valuesByName[this.splitByProp.column] : [null]
            if (this.splitByProp.column === 'theme') {
                columnValues = columnValues.slice().sort((a, b) => {
                    return themesCss[b].priority - themesCss[a].priority
                })
            }
            return rowValues.map((rowValue, rowIndex) => {
                const themeCss = this.filters.theme && themesCss[this.filters.theme] || this.splitByProp.row === 'theme' && themesCss[rowValue]
                const rowTitle = this.splitByProp.row ? this.configurations.extractFromConfiguration({ [this.splitByProp.row]: rowValue }, { addName: true }).name.toUpperCase() : ''
                const firstColumn = this.splitByProp.flat.some(x => x.name) ? {
                    content: this.splitByProp.flat.map(usecase => usecase.name.toUpperCase()),
                    first: true,
                    themeCss: themeCss || themesCss.light,
                } : null
                const columnItems = [
                    ...(firstColumn ? [firstColumn] : []),
                    ...columnValues.map((columnValue, index) => {
                        return {
                            title: this.splitByProp.column ? this.configurations.extractFromConfiguration({ [this.splitByProp.column]: columnValue }).name : ' ',
                            content: this.splitByProp.flat.map(x => {
                                const configuration =
                                {
                                    ...x.configuration.data,
                                    ...this.filters,
                                }
                                if (this.splitByProp.row) {
                                    configuration[this.splitByProp.row] = rowValue
                                }
                                if (this.splitByProp.column) {
                                    configuration[this.splitByProp.column] = columnValue
                                }
                                return {
                                    ...configuration,
                                    ...x.usecase,
                                    key: `${x.configuration.key}-${rowValue}-${columnValue}`,
                                    name: this.configurations.extractFromConfiguration(configuration).name,
                                }
                            }),
                            value: columnValue,
                            themeCss: themeCss || this.splitByProp.column === 'theme' && themesCss[columnValue] || themesCss.light,
                        }
                    }),
                ]
                columnItems[0].rowTitle = rowTitle
                return columnItems
            })
        },
    },
    created () {
        this.configurations = new ComponentConfigurations(this.component)
    },
    methods: {
        onRowClick (rowIndex) {
            this.$emit('filter', { [this.splitByProp.row]: this.valuesByName[this.splitByProp.row][rowIndex] } )
        },
        onTableClick ({ rowIndex, columnIndex, value }) {
            if (rowIndex === 0 && columnIndex > 0) {
                this.$emit('filter', { [this.splitByProp.column] : value })
            }
        },
        copyCode (item) {
            const props = {}
            for (const key in item) {
                if (!['scopedSlots', 'key', 'null', 'usecaseName'].includes(key)) {
                    props[key] = item[key]
                }
            }

            const componentName = this.component.metaName

            const code = `<${kebabCase(componentName)} ${Object.keys(props).map(propName => `:${propName}="${props[propName]}"`).join(' ')}></${kebabCase(componentName)}>`

            const input = document.createElement('input')
            input.setAttribute('value', code)
            document.body.appendChild(input)
            input.select()
            const result = document.execCommand('copy')
            document.body.removeChild(input)
        },
    },
}
</script>

<style lang="less" module>
@border-radius: 4px;

.boundingBox {
    width: calc(~'100% - 30px');
    display: flex;
    border: 1px solid transparent;
    box-sizing: border-box;
}

.table {
    animation: fadeIn 250ms ease-out;
    margin-bottom: 40px;
}

@keyframes fadeIn {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
}

.rowTitle {
    font-size: 24px;
    line-height: 24px;
    padding: 10px 15px;
    margin-bottom: 10px;
    display: inline-block;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
}

.row {
    border-radius: @border-radius;
    overflow: hidden;
}

.flatName {
    font-size: 12px;
    display: flex;
    align-items: center;
    height: 20px;
    margin: 0;
}

.slotContainer {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    box-sizing: border-box;

    &:hover {
        .copyButton {
            background-color: rgba(200, 122, 122, 0.5);
        }

    }

    &_showSnapshot {
        .snapshotImage {
            display: none;
            width: 100%;
            overflow: hidden;
        }

        &:hover {
            .snapshotImage {
                display: block;
            }

            .component {
                display: none;
            }
        }
    }
}

.copyButton {
    cursor: pointer;
    background-color: transparent;
    width: 100%;
    height: 10px;
    transition: background-color 150ms ease-out, opacity 400ms ease-out;

    &:hover {
        opacity: 0.8;
    }
}
</style>
