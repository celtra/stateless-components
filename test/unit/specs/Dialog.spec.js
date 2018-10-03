import Dialog from '@/stateless/dialog.vue'
import Vue from 'vue'
import { getFlatUsecases } from '@/component_utils'

const Constructor = Vue.extend(Dialog)
const vm = new Constructor({
    propsData: getFlatUsecases(Dialog)[0].data,
}).$mount()

describe('Dialog', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
