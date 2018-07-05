import SupportText from '@/stateless/support_text.vue'
import Vue from 'vue'
import components from '@/components'

const Constructor = Vue.extend(SupportText)
const vm = new Constructor({
    propsData: components.SupportText.defaultProps,
}).$mount()

describe('SupportText', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
