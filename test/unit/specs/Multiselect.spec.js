import Multiselect from '@/stateless/multiselect.vue'
import '@/stateless/vue_helpers'
import Vue from 'vue'
import components from '@/components'

const Constructor = Vue.extend(Multiselect)
const vm = new Constructor({
    propsData: components.Multiselect.defaultProps,
}).$mount()

Vue.component('transition-group', {
    render (createElement) {
        return createElement('div', this.$slots.default)
    },
})

describe('Multiselect', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
