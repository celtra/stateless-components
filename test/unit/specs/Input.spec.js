import Input from '@/stateless/input.vue'
import Vue from 'vue'
import components from '@/components'

const Constructor = Vue.extend(Input)
const vm = new Constructor({
    propsData: components.Input.defaultProps,
}).$mount()

describe('Input', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
