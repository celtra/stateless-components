import Checkbox from '@/stateless/checkbox.vue'
import Vue from 'vue'
import components from '@/components'

const Constructor = Vue.extend(Checkbox)
const vm = new Constructor({
    propsData: components.Checkbox.defaultProps,
}).$mount()

describe('Checkbox', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
