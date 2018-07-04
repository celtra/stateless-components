import DialogButton from '@/stateless/dialog_button.vue'
import Vue from 'vue'
import components from '@/components'

const Constructor = Vue.extend(DialogButton)
const vm = new Constructor({
    propsData: components.DialogButton.defaultProps,
}).$mount()

describe('DialogButton', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
