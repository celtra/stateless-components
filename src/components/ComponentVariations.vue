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
        theme: { type: String, required: false },
        showBoundingBoxes: { type: Boolean, default: false },
        filters: { type: Object, default: () => ({}) },
    },
    data () {
        return {
            hoverUsecaseIndex: null,
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

            // const ignoreVariations = this.theme ? ['theme'] : []
            const flatUsecases = getFlatUsecases(this.component)

            const defaultModelValue = this.component.variations[this.modelName] && this.component.variations[this.modelName][0] || null

            const relevantUsecases = flatUsecases.filter(usecase => {
                if (!this.filters[this.modelName] && usecase.data[this.modelName] !== defaultModelValue) {
                    return false
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
            for (const key of Object.keys(this.component.variations).filter(name => ![this.modelName, this.columnProp, this.rowProp].includes(name))) {
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
    methods: {
        getQuadrantUsecases (column, row) {
            return this.usecases.filter(usecase => {
                if (this.columnProp && usecase[this.columnProp] !== column) {
                    return false
                }
                if (this.rowProp && usecase[this.rowProp] !== row) {
                    return false
                }
                return true
            })
        },
    },
    render (h) {
        if (!this.component) {
            return h()
        }

        const mapUsecases = usecases => {
            return usecases.map((usecase, index) => {
                return h('div', {
                    key: Math.round(Math.random() * Number.MAX_SAFE_INTEGER).toString(),
                    class: 'component',
                    style: { backgroundColor: this.hoverUsecaseIndex === index ? 'rgba(122, 122, 122, 0.1)' : 'auto' },
                    on: {
                        mousemove: (ev) => {
                            if (ev.movementX !== 0 || ev.movementY !== 0) {
                                this.hoverUsecaseIndex = index
                            }
                        },
                        mouseleave: (ev) => {
                            this.hoverUsecaseIndex = null
                        },
                    },
                }, [h(ComponentUsecase, { style: this.showBoundingBoxes ? { backgroundColor: 'rgba(0, 0, 0, 0.05)' } : {}, props: { component: this.component, usecase: { ...usecase, theme: this.theme || usecase.theme } } })])
            })
        }

        const groupByProps = (usecases, depth = 0) => {
            if (depth >= this.groupBy.length) {

                return mapUsecases(usecases)
            }
            const splitByProp = this.groupBy[depth]
            const propData = this.component.props[splitByProp]
            const MAX = 26, MIN = 10
            const titleSize = (MAX - MIN) * Math.pow(1.2, -4 * depth) + MIN
            return Object.values(this.valuesByName[splitByProp]).map(availableValue => {
                let displayTitle = availableValue
                if (propData.type === Boolean) {
                    displayTitle = availableValue ? kebabCase(splitByProp) : null
                }

                if (!displayTitle) {
                    return groupByProps(usecases.filter(x => x[splitByProp] === availableValue), depth + 1)
                }

                return h('div', { class: 'group-container' }, [
                    h('p', { class: 'group-title', style: { fontSize: `${titleSize}px`, lineHeight: `${titleSize}px` } }, displayTitle.toUpperCase()),
                    h('div', { class: 'group-content' }, groupByProps(usecases.filter(x => x[splitByProp] === availableValue), depth + 1)),
                ])
            })
        }

        const themesCss = {
            white: { backgroundColor: 'white', color: 'black' },
            light: { backgroundColor: '#f2f2f3', color: 'black' },
            dark: { backgroundColor: '#1f1f2c', color: 'white' },
        }

        /*if (this.theme) {
            if (this.valuesByName.size) {
                return h('div', [
                    h('div', { class: 'themes-wrap' }, this.valuesByName.size.map((value, index) => {
                        return h('div', { class: 'theme-container', style: themeCss }, [
                            h('p', { class: 'group-title', style: { fontSize: '22px' } }, value.toUpperCase()),
                            h('div', { class: 'group-content' }, groupByProps(this.usecases.filter(x => x.size === value), 0, index === 0)),
                        ])
                    })),
                ])
            } else {
                return h('div', { class: 'groups-wrap', style: themeCss }, groupByProps(this.usecases))
            }
        }*/
        const rowValues = this.valuesByName[this.rowProp]

        const renderColumns = (usecases) => {
            return h('div', { class: 'themes-wrap' }, [
                h('div', { class: 'theme-container' }, [
                    h('p', { class: 'group-title', style: { fontSize: '22px' } }, 'NAMES'),
                    h('div', { class: 'group-content' }, this.flatUsecases.map(usecase => {
                        return h('div', usecase.name)
                    })),
                ]),
                ...this.valuesByName[this.columnProp].map((value, index) => {
                    let displayTitle = value || ''
                    if (typeof value === 'boolean') {
                        displayTitle = value ? kebabCase(this.groupBy[0]) : `NOT ${kebabCase(this.groupBy[0])}`
                    }

                    const themeCss = themesCss[this.groupBy[0] === 'theme' ? value : this.theme]

                    return h('div', { class: 'theme-container', style: themeCss }, [
                        h('p', { class: 'group-title', style: { fontSize: '22px' } }, displayTitle.toUpperCase()),
                        h('div', { class: 'group-content' }, groupByProps(usecases.filter(x => x[this.columnProp] === value), 1)),
                    ])
                }),
            ])
        }

        if (this.rowProp) {
            return h('div', { class: 'rows-container' }, this.valuesByName[this.rowProp].map(rowValue => {
                return h('div', { class: 'row' }, [
                    h('div', { class: 'column-container' }, [
                        h('div', { class: 'column-title' }, rowValue.toString().toUpperCase()),
                        h('div', { class: 'columns-content' }, this.flatUsecases.map(usecase => {
                            return h('div', usecase.name)
                        })),
                    ]),
                    ...this.valuesByName[this.columnProp].map(columnValue => {
                        return h('div', { class: 'column-container' }, [
                            h('div', { class: 'column-title' }, columnValue.toUpperCase()),
                            h('div', { class: 'columns-content' }, mapUsecases(this.usecases.filter(x => x[this.rowProp] === rowValue && x[this.columnProp] === columnValue))),
                        ])
                    }),
                ])
            }))
        } else if (this.columnProp) {
            return renderColumns(this.usecases)
        }

        if (this.groupBy.length > 0 && this.valuesByName[this.groupBy[0]].length > 0) {

        } else {
            return h('div', { class: 'groups-wrap', style: themesCss.light }, groupByProps(this.usecases))
        }
    },
}
</script>

<style lang="less" scoped>
.themes-wrap {
    display: flex;
    height: 100%;
}

.theme-container {
    width: 100%;
    overflow-y: auto;
}

.groups-wrap {
    padding: 20px;
}

.group-container {
    flex: 1;
    margin-top: 20px;

    padding: 15px 10px;

    &:first-child {
        margin-top: 0;
    }
}

.group-content {
    box-sizing: border-box;
    border: 1px solid rgba(122, 122, 122, 0.25);
}

.group-title {
    margin: 0;
    margin-bottom: 20px;
}

.component {
    position: relative;
    padding-bottom: 5px;
    padding: 10px 20px;
    display: flex;
    align-items: center;

    &:last-child {
        margin-bottom: 0;
    }

    > div {
        margin: 0;
        height: auto;
    }

    .usecase-name {
        margin-right: 15px;
        font-size: 14px;
        font-weight: bold;
        min-width: 120px;
    }
}

/* NEW LAYOUT */
.row {
    display: flex;
}

.column-container {
    flex: 1;
}
</style>
