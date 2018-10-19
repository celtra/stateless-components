<script>
import { getFlatUsecases, getFlatVariations } from '../component_utils'
import ComponentUsecase from './ComponentUsecase.vue'
import { kebabCase } from 'lodash'

export default {
    components: {
        ComponentUsecase,
    },
    props: {
        component: { type: Object, required: true },
        filters: { type: Object, default: () => ({}) },
        showBoundingBoxes: { type: Boolean, default: false },
    },
    data () {
        return {
            hoverUsecaseKey: null,
        }
    },
    computed: {
        modelName () {
            return this.component.model && this.component.model.prop || 'value'
        },
        usecases () {
            if (this.component === null) {
                return null
            }

            const flatUsecases = getFlatUsecases(this.component)

            const relevantUsecases = flatUsecases.filter(usecase => {
                if (this.component.variations[this.modelName]) {
                    if (!this.filters[this.modelName] && usecase.data[this.modelName] !== this.component.variations[this.modelName][0]) {
                        return false
                    }
                }

                for (const prop in this.filters) {
                    if (usecase.data[prop] !== this.filters[prop]) {
                        return false
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
                    filteredUsecases.push(usecase.data)
                }
            }

            return filteredUsecases
        },
        groupBy () {
            const props = this.valuesByName ? Object.keys(this.valuesByName) : []
            const relevance = {
                theme: 20,
                size: 10,
            }
            return props.filter(x => !Object.keys(this.filters).concat([this.modelName]).includes(x)).sort((a, b) => {
                const relevanceA = relevance[a] || 0
                const relevanceB = relevance[b] || 0
                const difference = relevanceB - relevanceA
                if (difference === 0) {
                    return this.valuesByName[b].length - this.valuesByName[a].length
                } else {
                    return difference
                }
            })
        },
        valuesByName () {
            const values = {}
            for (const usecase of this.usecases) {
                for (const key in usecase) {
                    if (this.component.variations[key] && (!values[key] || values[key].indexOf(usecase[key]) === -1)) {
                        if (!values[key]) {
                            values[key] = []
                        }
                        values[key].push(usecase[key])
                    }
                }
            }
            return values
        },
        columnProp () {
            return this.groupBy.length > 0 ? this.groupBy[0] : null
        },
        rowProp () {
            return this.groupBy.length > 1 ? this.groupBy[1] : null
        },
        flatUsecases () {
            const allVariations = this.component.variations
            const allNames = this.component.usecases.map(x => x.name)
            const remainingVariations = {}
            for (const key of Object.keys(this.component.variations).filter(name => !Object.keys(this.filters).concat([this.modelName, this.columnProp, this.rowProp]).includes(name))) {
                remainingVariations[key] = this.component.variations[key]
            }

            const flat = []
            for (const name of allNames) {
                for (const variation of getFlatVariations(remainingVariations)) {
                    const variationSuffix = Object.keys(variation).map(key => {
                        const propData = this.component.props[key]
                        if (propData.type === Boolean) {
                            return variation[key] ? key : null
                        }
                    }).filter(x => x).join(', ')
                    flat.push({
                        name: `${name} ${variationSuffix}`,
                        variation: variation,
                    })
                }
            }
            return flat
        },
    },
    render (h) {
        if (!this.component) {
            return h()
        }

        const createItem = (slot, key) => {
            return h('div', {
                class: 'column-item',
                style: this.hoverUsecaseKey === key ? { backgroundColor: 'rgba(122, 122, 122, 0.15)' } : {},
                on: {
                    mousemove: (ev) => {
                        if (ev.movementX !== 0 || ev.movementY !== 0) {
                            this.hoverUsecaseKey = key
                        }
                    },
                    mouseleave: (ev) => {
                        this.hoverUsecaseKey = null
                    },
                },
            }, slot)
        }

        const mapUsecases = (usecases, prefixIndex) => usecases.map((usecase, index) => {
            const slot = h(ComponentUsecase, { style: this.showBoundingBoxes ? { backgroundColor: 'rgba(59, 172, 255, 0.24)' } : {}, props: { component: this.component, usecase: { ...usecase, theme: this.filters.theme || usecase.theme } } })
            return createItem([slot], typeof prefixIndex !== 'undefined' ? `${prefixIndex}-${index}` : index)
        })

        const getPropTitle = (name, value) => {
            let title = kebabCase(value).toString().toUpperCase()
            if (this.component.props[name].type === Boolean && value) {
                title = 'NOT ' + title
            }
            return title
        }

        let rows = []
        if (this.rowProp) {
            rows = this.valuesByName[this.rowProp].map((rowValue, rowIndex) => {
                const columnItems = [
                    {
                        title: getPropTitle(this.rowProp, rowValue),
                        content: this.flatUsecases.map((usecase, index) => {
                            return createItem([h('span', { class: 'usecase-name' }, usecase.name)], `${rowIndex}-${index}`)
                        }),
                    },
                    ...this.valuesByName[this.columnProp].map((columnValue, index) => {
                        return {
                            title: getPropTitle(this.columnProp, columnValue),
                            content: mapUsecases(this.usecases.filter(x => x[this.rowProp] === rowValue && x[this.columnProp] === columnValue), rowIndex),
                        }
                    }),
                ]
                return columnItems
            })
        } else if (this.columnProp) {
            rows = [
                [
                    {
                        content: this.flatUsecases.map((usecase, index) => {
                            return createItem(usecase.name, index)
                        }),
                    },
                    ...this.valuesByName[this.columnProp].map(columnValue => {
                        let title = columnValue.toString().toUpperCase()
                        if (this.component.props[this.columnProp].type === Boolean) {
                            title = `${columnValue ? '' : 'not '}${this.columnProp}`
                        }
                        return {
                            title: title,
                            content: mapUsecases(this.usecases.filter(x => x[this.columnProp] === columnValue)),
                        }
                    }),
                ],
            ]
        } else {
            rows = [
                [
                    {
                        content: this.flatUsecases.map((usecase, index) => {
                            return createItem(usecase.name, index)
                        }),
                    },
                    {
                        content: mapUsecases(this.usecases),
                    },
                ],
            ]
        }

        const themesCss = {
            white: { backgroundColor: 'white', color: 'black' },
            light: { backgroundColor: '#f2f2f3', color: 'black' },
            dark: { backgroundColor: '#1f1f2c', color: 'white' },
        }

        return h('div', { class: 'rows-container' }, rows.map((columns, rowIndex) => {
            return h('div', { class: 'row' }, columns.map((column, columnIndex) => {
                const columnCss = this.columnProp === 'theme' && column.title ? themesCss[column.title.toLowerCase()] : (this.filters.theme ? themesCss[this.filters.theme] : {})
                return h('div', { class: { 'column-container': true,  'column-container--first': columnIndex === 0 }, style: columnCss }, [
                    h('div', { class: 'column-title' }, column.title || ''),
                    h('div', { class: 'column-content' }, column.content),
                ])
            }))
        }))
    },
}
</script>

<style lang="less" scoped>
@column-padding: 15px;

.row {
    display: flex;
    margin-bottom: 50px;
    background-color: rgba(122, 122, 122, 0.1);
    border-radius: 5px;
}

.column-container {
    flex: 1;
    padding-top: @column-padding;
}

.column-title {
    padding: 0 @column-padding;
    margin-bottom: 10px;
    min-height: 25px;
}

.column-container--first {
    width: 200px;
    flex: initial;
    font-weight: bold;

    .column-title {
        text-align: right;
    }

    .column-item {
        justify-content: flex-end;
        padding: 10px @column-padding;
    }
}

.column-item {
    cursor: pointer;
    padding: @column-padding;
    display: flex;

    > div {
        margin: 0 !important;
    }
}

.usecase-name {
    font-size: 14px;
    line-height: 14px;
}
</style>
