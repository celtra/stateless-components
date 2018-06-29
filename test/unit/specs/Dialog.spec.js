import Dialog from '@/stateless/dialog.vue'
import '@/stateless/vue_helpers'
import Vue from 'vue'
import components from '@/components'

const Constructor = Vue.extend(Dialog)
const vm = new Constructor({
    propsData: components.Dialog.defaultProps,
}).$mount()

describe('Dialog', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
