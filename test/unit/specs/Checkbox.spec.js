import Checkbox from '@/stateless/checkbox.vue'
import Vue from 'vue'

const Constructor = Vue.extend(Checkbox)
let vm

describe('Checkbox', () => {
    beforeEach(() => {
        vm = new Constructor({
            propsData: {
                value: false,
                helperText: 'help',
            },
        }).$mount()
    })

    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })

    describe('computed', () => {
        /*describe('labelText', () => {
            it('should be slot value', function () {
                vm.$slots.default = [{ text: 'Something' }]

                expect(vm.labelText).toBe("Something")
            })
        })

        describe('titleText', () => {
            it('should be label', function () {
                vm.$slots.default = [{ text: 'Something' }]

                expect(vm.titleText).toBe("Something")
            })

            it('should be disabled if disabled', function () {
                vm.disabled = true
                vm.disabledText = 'disabled'
                expect(vm.titleText).toBe("disabled")
            })
        })*/
    })

    describe('methods', () => {
        describe('setFocus', () => {
            it('should receive focus', function () {
                spyOn(vm, '$emit')
                vm.focused = false

                vm.setFocus(true)
                expect(vm.focused).toBe(true)
                expect(vm.$emit).toHaveBeenCalledWith('focus')
            })

            it('should lose focus', function () {
                spyOn(vm, '$emit')
                vm.focused = true

                vm.setFocus(false)
                expect(vm.focused).toBe(false)
                expect(vm.$emit).not.toHaveBeenCalled()
            })
        })

        describe('blur', function () {
            it('should blur current element', function () {
                spyOn(vm.$el, 'blur')
                vm.blur()
                expect(vm.$el.blur).toHaveBeenCalled()
            })
        })

        describe('toggle', () => {
            it('should emit events', function () {
                spyOn(vm, '$emit')
                vm.focused = true
                vm.value = false

                vm.toggle()

                expect(vm.focused).toBe(false)
                expect(vm.$emit).toHaveBeenCalledWith('focus')
                expect(vm.$emit).toHaveBeenCalledWith('input', true)
            })
        })
    })
})
