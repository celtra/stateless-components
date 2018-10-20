<script>
import { getFlatUsecases, getFlatVariations } from '../component_utils'
import ComponentUsecase from './ComponentUsecase.vue'
import { kebabCase } from 'lodash'
import Vue from 'vue'
import { getPropTitle } from './utils'

export default {
    components: {
        ComponentUsecase,
    },
    props: {
        component: { type: Object, required: true },
        filters: { type: Object, default: () => ({}) },
        showBoundingBoxes: { type: Boolean, default: false },
        useSyncValue: { type: Boolean, default: false },
    },
    data () {
        return {
            hoverUsecaseKey: null,
            syncValue: null,
            heightByKey: {},
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
                if (this.component.variations && this.component.variations[this.modelName]) {
                    if (!this.filters[this.modelName] && usecase.data[this.modelName] !== this.component.variations[this.modelName][0]) {
                        return false
                    }
                }

                for (const prop in this.filters) {
                    const targetValue = prop === 'usecaseName' ? usecase.data.name : usecase.data[prop]
                    if (targetValue !== this.filters[prop]) {
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
            // copied from ComponentPage.componentVariations
            const variations = this.component && { ...this.component.variations } || {}
            if (this.component.usecases[0].name) {
                variations.usecaseName = this.component.usecases.map(usecase => usecase.name)
            }
            return variations
        },
        columnProp () {
            for (const name of this.groupBy) {
                if (this.valuesByName[name].length <= 3) {
                    return name
                }
            }
            return null
        },
        rowProp () {
            for (const name of this.groupBy) {
                if (name !== this.columnProp && name !== 'usecaseName') {
                    return name
                }
            }
        },
        flatUsecases () {
            const allVariations = this.component.variations
            const allNames = this.component.usecases.map(x => x.name)
            const remainingVariations = {}
            if (this.component.variations) {
                for (const key of Object.keys(this.component.variations).filter(name => !Object.keys(this.filters).concat([this.modelName, this.columnProp, this.rowProp]).includes(name))) {
                    remainingVariations[key] = this.component.variations[key]
                }
            }

            const flat = []
            for (const name of allNames) {
                if (!this.filters.usecaseName || name === this.filters.usecaseName) {
                    for (const variation of getFlatVariations(remainingVariations)) {
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
                            name: `${name} ${variationSuffix}`,
                            variation: variation,
                        })
                    }
                }
            }
            return flat
        },
        rows () {
            if (this.rowProp && this.columnProp) {
                return this.valuesByName[this.rowProp].map((rowValue, rowIndex) => {
                    const columnItems = [
                        {
                            title: getPropTitle(this.rowProp, rowValue),
                            content: this.flatUsecases.map((usecase, index) => {
                                return usecase.name
                            }),
                        },
                        ...this.valuesByName[this.columnProp].map((columnValue, index) => {
                            return {
                                title: getPropTitle(this.columnProp, columnValue),
                                content: this.usecases.filter(x => x[this.rowProp] === rowValue && x[this.columnProp] === columnValue),
                            }
                        }),
                    ]
                    return columnItems
                })
            } else if (this.rowProp) {
                return this.valuesByName[this.rowProp].map((rowValue, rowIndex) => {
                    const columnItems = [
                        {
                            title: getPropTitle(this.rowProp, rowValue),
                            content: this.flatUsecases.map((usecase, index) => {
                                return usecase.name
                            }),
                        },
                        {
                            content: this.usecases.filter(x => x[this.rowProp] === rowValue),
                        },
                    ]
                    return columnItems
                })
            } else if (this.columnProp) {
                return [
                    [
                        {
                            content: this.flatUsecases.map(usecase => usecase.name),
                        },
                        ...this.valuesByName[this.columnProp].map(columnValue => {
                            return {
                                title: getPropTitle(this.columnProp, columnValue),
                                content: this.usecases.filter(x => x[this.columnProp] === columnValue),
                            }
                        }),
                    ],
                ]
            } else {
                return [
                    [
                        {
                            content: this.flatUsecases.map(usecase => usecase.name),
                        },
                        {
                            content: this.usecases,
                        },
                    ],
                ]
            }
        },
    },
    render (h) {
        if (!this.component) {
            return h()
        }

        const themesCss = {
            white: { backgroundColor: 'white', color: 'black' },
            light: { backgroundColor: '#f2f2f3', color: 'black' },
            dark: { backgroundColor: '#1f1f2c', color: 'white' },
        }

        return h('div', this.rows.map((columns, rowIndex) => {
            return h('div', { class: this.$style.row }, columns.map((column, columnIndex) => {
                return h('div', {
                    class: { [this.$style.columnContainer]: true,  [this.$style.columnContainer_first]: columnIndex === 0 },
                    style: this.columnProp === 'theme' && column.title ? themesCss[column.title.toLowerCase()] : (this.filters.theme ? themesCss[this.filters.theme] : {}),
                }, [
                    h('div', { class: this.$style.columnTitle }, column.title || ''),
                    h('div', column.content.map((itemContent, itemIndex) => {
                        const key = `${rowIndex}-${itemIndex}`
                        let slot
                        if (typeof itemContent === 'object') {
                            slot = h(ComponentUsecase, {
                                class: this.$style.component,
                                key: itemContent.name,
                                props: {
                                    component: this.component,
                                    usecase: { ...itemContent, theme: this.filters.theme || itemContent.theme || 'light' },
                                    value: this.syncValue,
                                },
                                on: {
                                    input: (v) => {
                                        if (this.useSyncValue) {
                                            this.syncValue = v
                                        }
                                    },
                                    height: (v) => {
                                        if (columnIndex === 1) {
                                            Vue.set(this.heightByKey, key, v)
                                        }
                                    },
                                },
                            })
                            if (this.showBoundingBoxes) {
                                slot = h('div', { class: this.$style.columnItemBoundingContainer }, [slot])
                            }
                        } else if (typeof itemContent === 'string') {
                            slot = h('span', { class: this.$style.flatName, style: this.heightByKey[key] ? { height: `${Math.round(this.heightByKey[key])}px` } : {} }, itemContent)
                        }

                        return h('div', {
                            class: [this.$style.columnItem, { [this.$style.columnItem_active]: this.hoverUsecaseKey === key  }],
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
                        }, [slot])
                    })),
                ])
            }))
        }))
    },
}
</script>

<style lang="less" module>
@column-padding: 15px;
.row {
    display: flex;
    margin-bottom: 30px;
    background-color: #eee;
    border-radius: 5px;
}

.columnContainer {
    flex: 1;
    padding-top: @column-padding;
}

.columnTitle {
    padding: 0 @column-padding;
    margin-bottom: 10px;
    min-height: 25px;
}

.columnContainer_first {
    width: fit-content;
    min-width: 180px;
    flex: initial;
    font-weight: bold;

    .columnTitle {
        text-align: right;
    }

    .columnItem {
        justify-content: flex-end;
        padding: @column-padding;
    }
}

.columnItem {
    cursor: pointer;
    padding: @column-padding;
    display: flex;

    &_active {
        background-color: rgba(122, 122, 122, 0.15);
    }
}

.columnItemBoundingContainer {
    background-color: rgba(59, 172, 255, 0.25);
    width: 100%;
    // border: 1px solid rgba(0, 0, 0, 0.5);
}

.component {
    width: 100%;

    &.component.component {
        margin: 0;
    }
}

.flatName {
    font-size: 14px;
    display: flex;
    align-items: center;
    height: 20px;
    transition: height 400ms ease-in;
}
</style>
