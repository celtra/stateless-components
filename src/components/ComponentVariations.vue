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
            // TODO filter usecases that are identical except for value (take only the first one)
            return flatUsecases
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
            return props.filter(x => !['theme', this.modelName].includes(x)).sort((a, b) => {
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
                return usecases.map(usecase => h('div', { key: usecase.uniqueID, class: 'component' }, [h(ComponentUsecase, { props: { component: this.component, usecase: usecase } })]))
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
                    return groupByProps(usecases.filter(x => x.data[splitByProp] === availableValue), depth + 1)
                }

                return h('div', { class: 'group-container' }, [
                    h('p', { class: 'group-title', style: { fontSize: `${titleSize}px`, lineHeight: `${titleSize}px` } }, displayTitle.toUpperCase()),
                    h('div', { class: 'group-content' }, groupByProps(usecases.filter(x => x.data[splitByProp] === availableValue), depth + 1)),
                ])
            })
        }

        const groupByTheme = usecases => {
            if (this.component.variations && this.component.variations.theme) {
                return h('div', { class: 'themes-wrap' }, [
                    h('div', { class: 'theme-container', style: { backgroundColor: '#f2f2f3', color: 'black' } }, groupByProps(usecases.filter(x => x.data.theme === 'light'))),
                    h('div', { class: 'theme-container', style: { backgroundColor: '#1f1f2c', color: 'white' } }, groupByProps(usecases.filter(x => x.data.theme === 'dark'))),
                ])
            } else {
                return h('div', { class: 'groups-wrap' }, groupByProps(usecases))
            }
        }

        return h('div', [groupByTheme(this.usecases)])
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
    margin-bottom: 10px;
}

.component {
    position: relative;
    margin-bottom: 10px;

    &:last-child {
        margin-bottom: 0;
    }
}
</style>
