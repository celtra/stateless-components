<template>
    <div class="components-list">
        <div class="sidebar">
            <div v-for="componentData in components" :key="componentData.id" class="sidebar-item" @click="componentId = componentData.id">
                {{ componentData.id }}
            </div>
        </div>
        <div class="component-container">
            <div class="props">
                <table>
                    <tr v-for="prop in componentData.props" :key="prop.name" class="prop">
                        <td class="prop-name">{{ prop.name }}</td>
                        <td class="prop-value">
                            <div v-if="typeof(prop.default) == typeof(true)">
                                <input :value="prop.value"
                                       type="checkbox"
                                       @change="updateProp(componentData.id, prop.name, $event.target.checked)" />
                            </div>
                            <div v-else>
                                <input :value="prop.value"
                                       type="text"
                                       @input="updateProp(componentData.id, prop.name, $event.target.value)" />
                            </div>
                        </td>
                    </tr>
                </table>
            </div>

            <component :is="componentData.component" v-bind="componentData.data" :style="componentData.rootCss" class="instance" v-on="componentData.listeners"></component>
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

        let componentProps = componentData.component.props
        let defaultProps = componentData.defaultProps || {}

        let allProps = {}
        for (let key in componentProps)
            allProps[key] = true
        for (let key in defaultProps)
            allProps[key] = true
        allProps = Object.keys(allProps)

        return {
            ...componentData,
            id: componentId,
            modelName: modelName,
            modelEvent: modelEvent,
            props: allProps.map(propName => {
                return {
                    name: propName,
                    type: componentProps.hasOwnProperty(propName) ? componentProps[propName].type : typeof defaultProps[propName],
                    default: defaultProps.hasOwnProperty(propName) ? defaultProps[propName] : componentProps[propName].default,
                }
            }),
        }
    })
}

export default {
    name: 'components-list',
    data () {
        let vars = {
            componentId: Object.keys(components)[0],
            theme: 'light',
            size: 'normal',
        }
        for (let component of getComponents()) {
            let componentData = {}
            for (let prop of component.props) {
                componentData[prop.name] = prop.default
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
                    data: {
                        ...this[componentData.id],
                        theme: this.theme,
                        size: this.size,
                    },
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
        componentData () {
            return this.components.find(c => c.id === this.componentId)
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
    display: flex;
}

.sidebar {
    margin-top: 30px;
    margin-right: 50px;
}

.sidebar-item {
    background-color: #eee;
    border-bottom: 1px solid #ccc;
    padding: 5px 20px;
    color: #333;
    font-size: 13px;
    cursor: pointer;
    width: 250px;
}

.component-container {
    display: flex;
    width: fit-content;
    margin-bottom: 40px;
    margin-top: 60px;
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
