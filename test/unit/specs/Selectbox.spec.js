import Selectbox from '@/stateless/selectbox.vue'
import '@/stateless/vue_helpers'
import Vue from 'vue'
import components from '@/components'

const Constructor = Vue.extend(Selectbox)
const vm = new Constructor({
    propsData: components.Selectbox.defaultProps,
}).$mount()

describe('Selectbox', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
