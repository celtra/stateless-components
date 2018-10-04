import RadioButton from '@/stateless/radiobutton.vue'
import Vue from 'vue'
import snapshotMixin from '../component_snapshot_mixin'

const Constructor = Vue.extend(RadioButton)
let vm = null

describe('RadioButton', () => {
    beforeEach(function () {
        vm = new Constructor({
            propsData: {
                value: '',
                helperText: "help",
                selectedValue: 'test',
            },
        }).$mount()
    })

    snapshotMixin(RadioButton)

    describe('computed', () => {
        describe('states', () => {
            it('should be in default state', function () {
                expect(vm.states).toEqual({
                    error: false,
                    warning: false,
                    checked: false,
                    disabled: false,
                    focused: false,
                })
            })

            it('should be error', function () {
                vm.errorText = 'error'

                expect(vm.states).toEqual({
                    error: true,
                    warning: false,
                    checked: false,
                    disabled: false,
                    focused: false,
                })
            })

            it('should be warning', function () {
                vm.warningText = 'warning'

                expect(vm.states).toEqual({
                    error: false,
                    warning: true,
                    checked: false,
                    disabled: false,
                    focused: false,
                })
            })

            it('should be disabled', function () {
                vm.disabled = true

                expect(vm.states).toEqual({
                    error: false,
                    warning: false,
                    checked: false,
                    disabled: true,
                    focused: false,
                })
            })

            it('should be checked', function () {
                vm.value = 'x'
                vm.selectedValue = 'x'

                expect(vm.states).toEqual({
                    error: false,
                    warning: false,
                    checked: true,
                    disabled: false,
                    focused: false,
                })
            })
        })

        describe('infoText', () => {
            it('should be error if error', function () {
                vm.errorText = 'error'

                expect(vm.infoText).toBe("error")
            })

            it('should be error if warning', function () {
                vm.warningText = 'warning'

                expect(vm.infoText).toBe("warning")
            })

            it('should be helper', function () {
                expect(vm.infoText).toBe("help")
            })

            it('should be empty if no helper', function () {
                vm.helperText = null

                expect(vm.infoText).toBe("")
            })
        })

        describe('labelText', () => {
            /*it('should be slot value', function () {
                vm.$slots.default = [{ text: 'Something' }]

                expect(vm.labelText).toBe("Something")
            })*/

            it('should be disabled', function () {
                vm.disabled = true
                vm.disabledText = 'disabled'
                expect(vm.labelText).toBe('disabled')
            })
        })
    })

    describe('methods', () => {
        describe('click', () => {
            it('should emit', function () {
                spyOn(vm, '$emit')
                vm.value = 'x'

                vm.click()
                expect(vm.$emit).toHaveBeenCalledWith('input', 'x')
            })

            it('should not emit if disabled', function () {
                spyOn(vm, '$emit')
                vm.disabled = true

                vm.click()
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

        describe('setFocus', () => {
            it('should emit event if focused', function () {
                spyOn(vm, '$emit')
                vm.focused = false
                vm.setFocus(true)

                expect(vm.focused).toBe(true)
                expect(vm.$emit).toHaveBeenCalledWith('focus')
            })

            it('should not emit event if focus is lost', function () {
                spyOn(vm, '$emit')
                vm.focused = true
                vm.setFocus(false)

                expect(vm.focused).toBe(false)
                expect(vm.$emit).not.toHaveBeenCalled()
            })
        })
    })
})
