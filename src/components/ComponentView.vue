<script>
import '@/stateless/define_helpers'
import SelectProps from './SelectProps.vue'
import * as library from '../library.js'
import { getFlatUsecases, getProps } from '../component_utils'

export default {
    components: {
        SelectProps,
    },
    data () {
        return {
            name: null,
            value: null,
            query: {},
        }
    },
    computed: {
        componentData () {
            if (this.name === null) {
                return null
            }

            const component = library[this.name]

            const modelName = component.model ? component.value : 'value'
            const modelEvent = component.model ? component.event : 'input'

            let data = {
                [modelName]: this.value,
                theme: 'light',
                size: 'normal',
            }

            const usecases = getFlatUsecases(component)
            let slotFn = null
            if (usecases.length > 0) {
                data = { ...data, ...usecases[0].data }
                slotFn = usecases[0].data.slot || null
            }

            for (const key in this.query) {
                const propConfig = component.props[key]

                const value = this.query[key]
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
            const name = this.$route.params.component
            const data = components[name]
            if (!data) {
                throw `Component ${name} does not exist!`
            }

            const modelName = data.component.model ? data.component.value : 'value'
            this.value = data.defaultProps && data.defaultProps[modelName]
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
        let slot = this.componentData.slotFn ? this.componentData.slotFn.bind(this.componentData.data)(h) : null
        if (typeof slot === 'string') {
            slot = this._v(slot)
        }

        const propsList = getProps(this.componentData.component).map(prop => {
            return {
                ...prop,
                value: this.componentData.data[prop.name],
            }
        })

        // h(SelectProps, { style: { marginRight: '55px' }, props: { propsList } })

        return h('div', { style: { display: 'flex', position: 'relative', width: '50%' } }, [
            h(this.componentData.component, { props: this.componentData.data, listeners: this.componentData.listeners }, slot ? [slot] : []),
        ])
    },
}
</script>
