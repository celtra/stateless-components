import DialogButton from '@/stateless/dialog_button.vue'
import Vue from 'vue'
import components from '@/components'

const Constructor = Vue.extend(DialogButton)
let vm = null

describe('DialogButton', () => {
    beforeEach(() => {
        vm = new Constructor({
            propsData: {},
        }).$mount()
    })

    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })

    describe('methods', () => {
        describe('click', () => {
            it('should emit on click', function () {
                spyOn(vm, '$emit')

                vm.click()
                expect(vm.$emit).toHaveBeenCalledWith('click')
            })
        })
    })
})
