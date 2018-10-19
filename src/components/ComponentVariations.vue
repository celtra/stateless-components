<script>
import { getFlatUsecases } from '../component_utils'
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
    },
    computed: {
        modelName () {
            return this.component.model && this.component.model.prop || 'value'
        },
        usecases () {
            if (this.component === null) {
                return null
            }

            const ignoreVariations = this.theme ? ['theme'] : []
            const flatUsecases = getFlatUsecases(this.component, ignoreVariations)

            // Ignore usecase if it only has a different model prop
            const filteredUsecases = []
            const existingUsecaseIds = {}
            for (const usecase of flatUsecases) {
                if (!existingUsecaseIds[usecase.name]) {
                    existingUsecaseIds[usecase.name] = true
                    filteredUsecases.push(usecase.data)
                }
            }

            return filteredUsecases
        },
        themes () {
            return this.component.variations && this.component.variations.theme || []
        },
        sizes () {
            return this.component.variations && this.component.variations.size || []
        },
        groupBy () {
            const props = this.component.variations ? Object.keys(this.component.variations) : []
            const relevance = {
                size: 10,
            }
            return props.filter(x => {
                if (x === 'theme' || this.theme && x === 'size') {
                    return false
                }
                return true
            }).sort((a, b) => {
                const relevanceA = relevance[a] || 0
                const relevanceB = relevance[b] || 0
                return relevanceB - relevanceA
            })
        },
    },
    render (h) {
        if (!this.component) {
            return h()
        }

        const groupByProps = (usecases, depth = 0) => {
            if (depth >= this.groupBy.length) {
                return usecases.map((usecase, index) => h('div', { key: Math.round(Math.random() * Number.MAX_SAFE_INTEGER).toString(), class: 'component' }, [h(ComponentUsecase, { style: this.showBoundingBoxes ? { backgroundColor: 'rgba(0, 0, 0, 0.05)' } : {}, props: { component: this.component, usecase: { ...usecase, theme: this.theme || usecase.theme } } })]))
            }
            const splitByProp = this.groupBy[depth]
            const propData = this.component.props[splitByProp]
            const MAX = 26, MIN = 10
            const titleSize = (MAX - MIN) * Math.pow(1.2, -4 * depth) + MIN
            return this.component.variations[splitByProp].map(availableValue => {
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
            light: { backgroundColor: '#f2f2f3', color: 'black' },
            dark: { backgroundColor: '#1f1f2c', color: 'white' },
        }

        if (this.theme) {
            const themeCss = themesCss[this.theme]
            if (this.component.variations && this.component.variations.size) {
                return h('div', [
                    h('div', { class: 'themes-wrap' }, [
                        h('div', { class: 'theme-container', style: themeCss }, [
                            h('p', { class: 'group-title', style: { fontSize: '22px' } }, 'CONDENSED'),
                            h('div', { class: 'group-content' }, groupByProps(this.usecases.filter(x => x.size === 'condensed'))),
                        ]),
                        h('div', { class: 'theme-container', style: themeCss }, [
                            h('p', { class: 'group-title', style: { fontSize: '22px' } }, 'NORMAL'),
                            h('div', { class: 'group-content' }, groupByProps(this.usecases.filter(x => x.size === 'normal'))),
                        ]),
                        h('div', { class: 'theme-container', style: themeCss }, [
                            h('p', { class: 'group-title', style: { fontSize: '22px' } }, 'PHAT'),
                            h('div', { class: 'group-content' }, groupByProps(this.usecases.filter(x => x.size === 'phat'))),
                        ]),
                    ]),
                ])
            } else {
                return h('div', { class: 'groups-wrap', style: themeCss }, groupByProps(this.usecases))
            }
        } if (this.component.variations && this.component.variations.theme) {
            return h('div', [
                h('div', { class: 'themes-wrap' }, [
                    h('div', { class: 'theme-container', style: themesCss.light }, groupByProps(this.usecases.filter(x => x.theme === 'light'))),
                    h('div', { class: 'theme-container', style: themesCss.dark }, groupByProps(this.usecases.filter(x => x.theme === 'dark'))),
                ]),
            ])
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
    width: 50%;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;
}

.groups-wrap {
    padding: 20px;
}

.group-container {
    flex: 1;
    margin-top: 20px;
    border: 1px solid rgba(122, 122, 122, 0.25);
    padding: 15px 10px;

    &:first-child {
        margin-top: 0;
    }
}

.group-content {
    box-sizing: border-box;
}

.group-title {
    margin: 0;
    margin-bottom: 20px;
}

.component {
    position: relative;
    margin-bottom: 5px;

    &:last-child {
        margin-bottom: 0;
    }

    > div {
        margin: 0;
        height: auto;
    }
}
</style>
