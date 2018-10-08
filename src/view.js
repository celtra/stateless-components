import Vue from 'vue'
import * as library from './library'

Vue.config.productionTip = false

/* eslint-disable no-new */
const vm = new Vue({
    el: '#app',
    data () {
        return {
            componentName: null,
            props: {},
        }
    },
    computed: {
        component () {
            let component = library[this.componentName]
            if (!component) {
                component = Object.values(library).find(x => x.name === this.componentName)
            }
            return component
        },
    },
    methods: {
        setup () {
            if (this.component && this.component.setup) {
                return this.component.setup.bind(this.$children[0])()
            }
        },
    },
    render (h) {
        if (!this.component) {
            throw `Component ${this.componentName} does not exist!`
        }

        let slot = this.component.slot ? this.component.slot.bind(this.props)(h) : null
        if (typeof slot === 'string') {
            slot = this._v(slot)
        }

        const scopedSlots = this.component.scopedSlots ? this.component.scopedSlots.bind(this.props)(h) : {}

        return h('div', { style: { width: '640px', padding: '20px', boxSizing: 'border-box', position: 'relative' }, attrs: { id: 'container' } }, [
            h(this.component, { props: this.props, scopedSlots: scopedSlots }, slot ? [slot] : []),
        ])
    },
})

window.setComponent = (componentName, props) => {
    vm.componentName = componentName
    vm.props = props

    const bgColor = props.theme === 'dark' ? '#1f1f2c' : '#f2f2f3'
    document.body.style.backgroundColor = bgColor

    setTimeout(() => {
        const setupResult = vm.setup()
        if (setupResult) {
            setupResult.then(() => {
                const readyDomElement = document.createElement('div')
                readyDomElement.id = 'setup-done'
                document.body.appendChild(readyDomElement)
            })
        }
    }, 0)
}
