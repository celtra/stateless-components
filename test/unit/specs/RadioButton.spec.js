import RadioButton from '@/stateless/radiobutton.vue'
import Vue from 'vue'
import components from '@/components'

const Constructor = Vue.extend(RadioButton)
const vm = new Constructor({
    propsData: components.RadioButton.defaultProps,
}).$mount()

describe('RadioButton', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
