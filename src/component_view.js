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
            usecaseName: 0,
        }
    },
    computed: {
        component () {
            let component = library[this.componentName]
            if (!component) {
                component = Object.values(library).find(x => x.metaName === this.componentName)
            }
            return component
        },
        usecase () {
            if (!this.component || !this.component.usecases) {
                return null
            }
            return this.component.usecases.find(u => u.name === this.usecaseName)
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

        const props = { ...this.props, ...this.usecase }

        const scopedSlots = {}
        if (this.usecase && this.usecase.scopedSlots) {
            for (const name in this.usecase.scopedSlots) {
                scopedSlots[name] = () => this.usecase.scopedSlots[name].bind(props)(h)
            }
        }

        let slot = null
        if (scopedSlots.default) {
            slot = scopedSlots.default()
            if (typeof slot === 'string') {
                slot = this._v(slot)
            }
            delete scopedSlots.default
        }

        return h('div', { style: { width: '640px', position: 'relative' }, attrs: { id: 'container' } }, [
            h(this.component, { props: props, scopedSlots: scopedSlots, style: { margin: '0', width: '100%' } }, slot ? [slot] : []),
        ])
    },
})

window.setComponent = (componentName, props, usecaseName) => {
    vm.componentName = componentName
    vm.props = props
    vm.usecaseName = usecaseName

    const bgColor = props.theme === 'dark' ? '#1f1f2c' : '#f2f2f3'
    document.body.style.margin = '0'
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
