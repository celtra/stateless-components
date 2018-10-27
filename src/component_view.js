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
            usecaseIndex: 0,
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
        usecase () {
            if (!this.component || !this.component.usecases) {
                return null
            }
            return this.component.usecases[this.usecaseIndex]
        },
    },
    methods: {
        setup () {
            if (this.usecase && this.usecase.setup) {
                return this.usecase.setup.bind(this.$children[0])()
            }
        },
    },
    render (h) {
        if (!this.component) {
            throw `Component ${this.componentName} does not exist!`
        }

        let slot = this.usecase && this.usecase.slot ? this.usecase.slot.bind(this.props)(h) : null
        if (typeof slot === 'string') {
            slot = this._v(slot)
        }

        const scopedSlots = {}
        if (this.usecase && this.usecase.scopedSlots) {
            for (const name in this.usecase.scopedSlots) {
                scopedSlots[name] = this.usecase.scopedSlots[name].bind(this.props)(h)
            }
        }

        return h('div', { style: { width: '640px', padding: '20px', boxSizing: 'border-box', position: 'relative' }, attrs: { id: 'container' } }, [
            h(this.component, { props: this.props, scopedSlots: scopedSlots }, slot ? [slot] : []),
        ])
    },
})

window.setComponent = (componentName, props, usecaseIndex) => {
    vm.componentName = componentName
    vm.props = props
    vm.usecaseIndex = usecaseIndex

    const bgColor = props.theme === 'dark' ? '#1f1f2c' : '#f2f2f3'
    document.body.style.backgroundColor = bgColor

    const readyDomElement = document.createElement('div')
    readyDomElement.id = 'setup-done'
    setTimeout(() => {
        const setupResult = vm.setup()
        if (setupResult) {
            setupResult.then(() => {
                const readyDomElement = document.createElement('div')
                readyDomElement.id = 'setup-done'
                document.body.appendChild(readyDomElement)
            })
        } else {
            document.body.appendChild(readyDomElement)
        }
    }, 0)
}
