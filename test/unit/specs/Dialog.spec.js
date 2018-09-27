import Dialog from '@/stateless/dialog.vue'
import Vue from 'vue'

const Constructor = Vue.extend(Dialog)
const vm = new Constructor({
    propsData: Dialog.usecases[0],
}).$mount()

describe('Dialog', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
