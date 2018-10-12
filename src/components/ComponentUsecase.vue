<script>
const getModelName = component => component.model && component.model.prop || 'value'
const getModelEvent = component => component.model && component.model.event || 'input'

export default {
    props: {
        component: { type: Object, required: true },
        usecase: { type: Object, required: true },
    },
    data () {
        return {
            value: null,
        }
    },
    created () {
        const component = this.component
        const modelName = getModelName(component)
        if (typeof this.usecase.data.value !== 'undefined') {
            this.value = this.usecase.data.value
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
            this.value = defaultValue
        }
    },
    methods: {
        updateValue (value) {
            this.value = value
        },
    },
    render (h) {
        const props = {
            ...this.usecase.data,
            [getModelName(this.component)]: this.value,
        }

        let slot = this.usecase.data.slot ? this.usecase.data.slot.bind(props)(h) : null
        if (typeof slot === 'string') {
            slot = this._v(slot)
        }

        return h(this.component, {
            props: props,
            on: {
                [getModelEvent(this.component)]: (value) => {
                    this.updateValue(value)
                },
            },
        }, slot ? [slot] : [])
    },
}
</script>
