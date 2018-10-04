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
        return component ? h(component, { props: this.props }, component.slot ? [component.slot(h)] : []) : h()
    },
})

window.setComponent = (componentName, props) => {
    vm.componentName = componentName
    vm.props = props

    const bgColor = props.theme === 'dark' ? '#1f1f2c' : '#f2f2f3'
    document.body.style.backgroundColor = bgColor
}
