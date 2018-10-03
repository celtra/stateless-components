import SupportText from '@/stateless/support_text.vue'
import Vue from 'vue'
import { getFlatUsecases } from '@/component_utils'

const Constructor = Vue.extend(SupportText)
const vm = new Constructor({
    propsData: getFlatUsecases(SupportText)[0].data,
}).$mount()

describe('SupportText', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
