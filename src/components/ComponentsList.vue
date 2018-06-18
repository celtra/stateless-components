<template>
    <div class="components-list">
        <div v-for="(componentData, index) in components" :key="index" class="component-container">
            <div class="props">
                <table>
                    <tr v-for="prop in componentData.props" :key="prop.name" class="prop">
                        <td class="prop-name">{{ prop.name }}</td>
                        <td class="prop-value">
                            <input :value="prop.value" @input="updateProp(componentData.id, prop.name, $event.target.value)" />
                        </td>
                    </tr>
                </table>
            </div>

            <component :is="componentData.component" v-bind="componentData.data" :style="{ width: `${componentData.width}px` }" class="instance" v-on="componentData.listeners"></component>
        </div>
    </div>
</template>

<script>
import '@/stateless/vue_helpers'
import components from '../components.js'

let getComponents = () => {
    return Object.keys(components).map(componentId => {
        let componentData = components[componentId]

        let modelName = componentData.component.model ? componentData.component.value : 'value'
        let modelEvent = componentData.component.model ? componentData.component.event : 'input'

        let propsConfig = componentData.component.props
        return {
            ...componentData,
            id: componentId,
            modelName: modelName,
            modelEvent: modelEvent,
            props: Object.keys(propsConfig).map(propName => {
                return {
                    name: propName,
                    type: propsConfig[propName].type,
                    default: propsConfig[propName].default,
                }
            }),
        }
    })
}

export default {
    name: 'components-list',
    data () {
        let vars = {}
        for (let component of getComponents()) {
            let componentData = {}
            for (let prop of component.props) {
                componentData[prop.name] = component.defaultProps[prop.name] || prop.default || null
            }
            vars[component.id] = componentData
        }
        return vars
    },
    computed: {
        components () {
            let updateProp = this.updateProp

            return getComponents().map(componentData => {
                return {
                    ...componentData,
                    data: this[componentData.id],
                    props: componentData.props.map(prop => {
                        return {
                            ...prop,
                            value: this[componentData.id][prop.name],
                        }
                    }),
                    listeners: {
                        [componentData.modelEvent] (value) {
                            updateProp(componentData.id, componentData.modelName, value)
                        },
                    },
                }
            })
        },
    },
    methods: {
        updateProp (componentId, name, value) {
            this.$set(this[componentId], name, value)
        },
    },
}
</script>

<style lang="less" scoped>
.components-list {
    margin: 50px 100px;
}

.component-container {
    display: flex;
    width: fit-content;
    margin-bottom: 40px;
}

.props {
    min-width: 400px;
}

.prop {
    .prop-name {
        padding-right: 10px;
        text-align: right;
        font-size: 12px;
    }
    .prop-value {
        padding-left: 10px;
    }
}
</style>
