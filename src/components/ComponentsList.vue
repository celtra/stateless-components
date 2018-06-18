<template>
    <div class="components-list">
        <div v-for="(componentData, index) in components" :key="index" :style="{ width: `${componentData.width}px` }" class="component-container">
            <component :is="componentData.component" v-bind="componentData.props" :value="componentData.modelValue" @input="setModel(componentData.id, $event)"></component>

            <div class="props">
                <div v-for="prop in componentData.availableProps" :key="prop.name" class="prop">
                    {{ prop.name }}
                    <input />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '@/stateless/vue_helpers'
import components from '../components.js'

export default {
    name: 'components-list',
    data () {
        let vars = {}
        for (let componentId in components) {
            if (components[componentId].needsModel) {
                vars[componentId + '_model'] = null
            }
        }
        return vars
    },
    computed: {
        components () {
            return Object.keys(components).map(componentId => {
                let componentData = components[componentId]
                return {
                    ...componentData,
                    id: componentId,
                    modelValue: this[componentId + '_model'],
                    availableProps: Object.keys(componentData.component.props).map(propName => {
                        return {
                            name: propName,
                            type: componentData.component.props[propName].type,
                        }
                    }),
                }
            })
        },
    },
    methods: {
        setModel (componentId, value) {
            this[componentId + '_model'] = value
        },
    },
}
</script>

<style lang="less" scoped>
.components-list {
    margin: 50px 100px;
}

.component-container {
    border: 1px solid #ccc;
    padding: 10px 20px;
}
</style>
