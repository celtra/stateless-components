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
    render (h) {
        let component = library[this.componentName]
        if (!component) {
            component = Object.values(library).find(x => x.name === this.componentName)
        }

        if (!component) {
            return h()
        }

        let slot = component.slot ? component.slot.bind(this.props)(h) : null
        if (typeof slot === 'string') {
            slot = this._v(slot)
        }

        return h('div', { style: { width: '640px', padding: '20px', boxSizing: 'border-box', position: 'relative' }, attrs: { id: 'container' } }, [
            h(component, { props: this.props }, slot ? [slot] : []),
        ])
    },
})

window.setComponent = (componentName, props) => {
    vm.componentName = componentName
    vm.props = props

    const bgColor = props.theme === 'dark' ? '#1f1f2c' : '#f2f2f3'
    document.body.style.backgroundColor = bgColor
}
