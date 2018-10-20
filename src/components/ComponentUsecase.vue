<script>
const getModelName = component => component.model && component.model.prop || 'value'
const getModelEvent = component => component.model && component.model.event || 'input'

export default {
    props: {
        component: { type: Object, required: true },
        usecase: { type: Object, required: true },
        value: { type: null, required: false },
    },
    data () {
        return {
            currentValue: null,
        }
    },
    watch: {
        value (v) {
            this.currentValue = v
        },
    },
    created () {
        const component = this.component
        const modelName = getModelName(component)
        if (typeof this.usecase.value !== 'undefined') {
            this.currentValue = this.usecase.value
        } else {
            let defaultValue = component.props && component.props[modelName] && component.props[modelName].default
            if (typeof defaultValue === 'undefined') {
                const type = component.props && component.props[modelName] && component.props[modelName].type
                if (type === Array) {
                    defaultValue = []
                } else if (type === Object) {
                    defaultValue = {}
                } else if (type === String) {
                    defaultValue = ''
                } else {
                    defaultValue = null
                }
            }
            this.currentValue = defaultValue
        }
    },
    mounted () {
        if (this.usecase.setup) {
            this.usecase.setup(this.$children[0])
        }
    },
    methods: {
        updateValue (value) {
            this.currentValue = value
            this.$emit('input', value)
        },
    },
    render (h) {
        const props = {
            ...this.usecase,
            [getModelName(this.component)]: this.currentValue,
        }

        let slot = this.usecase.slot ? this.usecase.slot.bind(props)(h) : null
        if (typeof slot === 'string') {
            slot = this._v(slot)
        }

        const scopedSlots = {}
        if (this.usecase && this.usecase.scopedSlots) {
            for (const name in this.usecase.scopedSlots) {
                scopedSlots[name] = () => this.usecase.scopedSlots[name](h)
            }
        }

        return h(this.component, {
            props: props,
            scopedSlots: scopedSlots,
            on: {
                [getModelEvent(this.component)]: (value) => {
                    this.updateValue(value)
                },
            },
        }, slot ? [slot] : [])
    },
}
</script>
