import SupportText from '@/stateless/support_text.vue'
import Vue from 'vue'

const Constructor = Vue.extend(SupportText)
const vm = new Constructor({
    propsData: SupportText.usecases[0],
}).$mount()

describe('SupportText', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
