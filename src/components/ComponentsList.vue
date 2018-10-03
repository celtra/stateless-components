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
                    <select-props :props-list="componentData.props" @change="updateProp(componentData.id, $event.name, $event.value)" />
                </div>
                <component :is="componentData.component" v-bind="componentData.data" :style="componentData.rootCss" class="instance" v-on="componentData.listeners"></component>
            </div>
        </div>
    </div>
</template>

<script>
import '@/stateless/define_helpers'
import SelectProps from './SelectProps.vue'
import * as library from '../library.js'
import { getProps } from '../component_utils'

const componentNames = Object.keys(library).filter(name => typeof library[name].render === 'function')

let getComponents = () => {
    return componentNames.map(componentName => {
        let component = library[componentName]

        let modelName = component.model ? component.value : 'value'
        let modelEvent = component.model ? component.event : 'input'

        return {
            component: component,
            id: componentName,
            modelName: modelName,
            modelEvent: modelEvent,
            props: getProps(component),
        }
    })
}

export default {
    components: {
        SelectProps,
    },
    data () {
        let vars = {
            componentId: componentNames[0],
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
@import (reference) '../stateless/common';

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

.flex {
    display: flex;
}

.dark-theme {
    background-color: #161623; // Dark background from UI System on invision, don't need this in variables
    color: white;
}
</style>
