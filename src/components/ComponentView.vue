<script>
import '@/stateless/define_helpers'
import * as library from '../library.js'
import { getFlatUsecases } from '../component_utils'

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

            const component = library[this.name]

            const modelName = component.model ? component.value : 'value'
            const modelEvent = component.model ? component.event : 'input'

            const usecases = getFlatUsecases(component)
            const defaultProps = usecases.length > 0 ? usecases[0].data : {}

            return {
                component: component,
                data: {
                    ...defaultProps,
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
            const component = library[name]
            if (!component) {
                throw `Component ${name} does not exist!`
            }

            const modelName = component.model ? component.value : 'value'
            this.value = component.props && component.props[modelName] && component.props[modelName].default || null
            this.name = name
        },
        updateValue (value) {
            this.value = value
        },
    },
    render (h) {
        if (!this.componentData) {
            return h()
        }
        let slot = this.componentData.component.slot ? this.componentData.component.slot.bind(this.componentData.data)(h) : null
        if (typeof slot === 'string') {
            slot = this._v(slot)
        }

        return h('div', { style: { display: 'flex', position: 'relative', width: '50%' } }, [
            h(this.componentData.component, { props: this.componentData.data, listeners: this.componentData.listeners }, slot ? [slot] : []),
        ])
    },
}
</script>

