<script>
import '@/stateless/define_helpers'
import * as library from '../library.js'

export default {
    data () {
        return {
            name: null,
            value: null,
            query: {},
        }
    },
    computed: {
        componentData () {
            if (this.name === null)
                return null

            let component = library[this.name]

            let modelName = component.model ? component.value : 'value'
            let modelEvent = component.model ? component.event : 'input'

            let data = {
                [modelName]: this.value,
                theme: 'light',
                size: 'normal',
            }

            let slotFn = null
            if (component.usecases) {
                data = { ...data, ...component.usecases[0] }
                slotFn = component.usecases[0].slot || null
            }

            for (let key in this.query) {
                let propConfig = component.props[key]

                let value = this.query[key]
                if (!propConfig) {
                    data[key] = value
                } else if (propConfig.type === Boolean) {
                    if (value === 'true') {
                        data[key] = true
                    } else if (value === 'false') {
                        data[key] = false
                    }
                } else if (propConfig.type === Number) {
                    const numberValue = parseFloat(value)
                    if (!isNaN(numberValue)) {
                        data[key] = numberValue
                    }
                } else if (propConfig.type === String) {
                    data[key] = value
                } else if (propConfig.type === Object || propConfig.type === Array) {
                    try {
                        data[key] = JSON.parse(value)
                    } catch (e) { }
                }
            }

            return {
                component: component,
                data: data,
                slotFn: slotFn,
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
        '$route.query': {
            handler (name) {
                this.updateQuery()
            },
            deep: true,
        },
    },
    created () {
        this.setupComponent()
        this.updateQuery()
    },
    methods: {
        setupComponent () {
            let name = this.$route.params.component
            let component = library[name]
            if (!component) {
                throw `Component ${name} does not exist!`
            }

            let modelName = component.model ? component.value : 'value'
            this.value = component.props[modelName] ? component.props[modelName].default : null
            this.name = name
        },
        updateQuery () {
            this.query = { ...this.$route.query }
        },
        updateValue (value) {
            this.value = value
        },
    },
    render (h) {
        if (!this.componentData) {
            return h()
        }
        let slot = this.componentData.slotFn ? this.componentData.slotFn(h) : []
        if (typeof slot === 'string') {
            slot = this._v(slot)
        }
        return h(this.componentData.component, { props: this.componentData.data, class: 'instance', listeners: this.componentData.listeners }, [slot])
    },
}
</script>

