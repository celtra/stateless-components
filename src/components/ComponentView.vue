<template>
    <div>
        <component v-if="componentData" :is="componentData.component" v-bind="componentData.data" :style="componentData.rootCss" class="instance" v-on="componentData.listeners"></component>
    </div>
</template>

<script>
import '@/stateless/define_helpers'
import components from '../components.js'

export default {
    data () {
        return {
            name: null,
            value: null,
        }
    },
    computed: {
        componentData () {
            if (this.name === null) {
                return null
            }

            const data = components[this.name]

            const modelName = data.component.model ? data.component.value : 'value'
            const modelEvent = data.component.model ? data.component.event : 'input'

            return {
                ...data,
                data: {
                    ...data.defaultProps,
                    [modelName]: this.value,
                    theme: 'light',
                    size: 'normal',
                },
                listeners: {
                    [modelEvent]: (value) => {
                        this.updateValue(value)
                    },
                },
            }
        },
    },
    watch: {
        '$route.params.component' (name) {
            this.setupComponent()
        },
    },
    created () {
        this.setupComponent()
    },
    methods: {
        setupComponent () {
            const name = this.$route.params.component
            const data = components[name]
            if (!data) {
                throw `Component ${name} does not exist!`
            }

            const modelName = data.component.model ? data.component.value : 'value'
            this.value = data.defaultProps && data.defaultProps[modelName]
            this.name = name
        },
        updateValue (value) {
            this.value = value
        },
    },
}
</script>

