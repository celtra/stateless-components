<script>
const getModelName = component => component.model && component.model.prop || 'value'
const getModelEvent = component => component.model && component.model.event || 'input'

export default {
    props: {
        component: { type: Object, required: true },
        value: { type: null, required: false },
        setup: { type: Function },
        scopedSlots: { type: Object },
        columnIndex: { type: Number, required: true },
        rowIndex: { type: Number, required: true },
    },
    data () {
        return {
            currentValue: null,
            height: null,
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
        if (typeof this.$attrs[modelName] !== 'undefined') {
            this.currentValue = this.$attrs[modelName]
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
        if (this.setup) {
            this.setup(this.$children[0])
        }

        if (this.columnIndex === 1) {
            const styles = window.getComputedStyle(this.$el)
            const margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom'])
            this.$nextTick(() => {
                setTimeout(() => {
                    this.$parent.$emit('height', { rowIndex: this.rowIndex, height: this.$el.clientHeight + margin })
                }, 5)
            })
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
            ...this.$attrs,
            [getModelName(this.component)]: this.currentValue,
        }

        let slot = this.slot ? this.slot.bind(props)(h) : null
        if (typeof slot === 'string') {
            slot = this._v(slot)
        }

        const scopedSlots = {}
        if (this.scopedSlots) {
            for (const name in this.scopedSlots) {
                scopedSlots[name] = () => this.scopedSlots[name](h)
            }
        }

        return h(this.component, {
            props: props,
            scopedSlots: scopedSlots,
            class: this.$style.component,
            on: {
                [getModelEvent(this.component)]: (value) => {
                    this.updateValue(value)
                },
            },
        }, slot ? [slot] : [])
    },
}
</script>

<style lang="less" module>
.component {
    width: 100% !important;
    margin: 0 !important;
    height: auto !important;
}
</style>
