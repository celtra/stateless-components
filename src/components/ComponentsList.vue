<template>
    <div :class="{ 'dark-theme': theme === 'dark' }">
        <div class="theme">
            <div class="flex">
                <span>Theme</span>
                <input id="light" v-model="theme" type="radio" value="light">
                <label for="light">Light</label>
                <input id="dark" v-model="theme" type="radio" value="dark">
                <label for="dark">Dark</label>
            </div>
            <div class="flex">
                <span>Size</span>
                <input id="condensed" v-model="size" type="radio" value="condensed">
                <label for="condensed">Condensed</label>
                <input id="normal" v-model="size" type="radio" value="normal">
                <label for="normal">Normal</label>
                <input id="phat" v-model="size" type="radio" value="phat">
                <label for="phat">Phat</label>
            </div>
        </div>

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
                                <div v-if="prop.availableValues">
                                    <select @change="updateProp(componentData.id, prop.name, $event.target.value)">
                                        <option v-for="value in prop.availableValues" :key="value">{{ value }}</option>
                                    </select>
                                </div>
                                <div v-else-if="typeof(prop.default) == typeof(true)">
                                    <input :value="prop.value"
                                           type="checkbox"
                                           @change="updateProp(componentData.id, prop.name, $event.target.checked)" />
                                </div>
                                <div v-else>
                                    <input :value="prop.value"
                                           :disabled="prop.name === 'theme' || prop.name === 'size'"
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
    </div>
</template>

<script>
import '@/stateless/define_helpers'
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
                    availableValues: componentData.availableProps && componentData.availableProps[propName] || null,
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
                componentData[prop.name] = prop.name === 'theme' ? vars.theme : prop.name === 'size' ?  vars.size : prop.default
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
                    },
                    props: componentData.props.map(prop => {
                        return {
                            ...prop,
                            value: prop.name === 'theme' ?
                                this.theme : prop.name === 'size' ?  this.size :
                                    this[componentData.id][prop.name],
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
    watch: {
        theme (value) {
            this.updateProp(this.componentId, 'theme', value)
        },
        size (value) {
            this.updateProp(this.componentId, 'size', value)
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
@import (reference) '../stateless/variables';

.components-list {
    display: flex;
}

.sidebar {
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
    position: relative;
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

.flex {
    display: flex;
}

.dark-theme {
    background-color: #161623; // Dark background from UI System on invision, don't need this in variables
    color: white;
}
</style>
