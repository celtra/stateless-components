import { Input } from '@/library.js'
import Vue from 'vue'
import snapshotMixin from '../component_snapshot_mixin'

const Constructor = Vue.extend(Input)
let vm = null

describe('Input', () => {
    beforeEach(function () {
        vm = new Constructor({
            propsData: {
                label: "Label",
                state: "normal",
                placeholder: "Placeholder",
            },
        }).$mount()
    })

    snapshotMixin(Input)

    describe('computed', () => {
        describe('states', () => {
            it('should set default state', function () {
                expect(vm.states).toEqual({
                    focused: false,
                    error: false,
                    warning: false,
                    valid: false,
                    disabled: false,
                })
            })

            it('should set focused state', function () {
                vm.focused = true

                expect(vm.states).toEqual({
                    focused: true,
                    error: false,
                    warning: false,
                    valid: false,
                    disabled: false,
                })
            })

            it('should set error state', function () {
                vm.isValid = (v) => 'Error message'

                vm.runValidations('')

                expect(vm.states).toEqual({
                    focused: false,
                    error: true,
                    warning: false,
                    valid: false,
                    disabled: false,
                })
            })

            it('should set warning state', function () {
                vm.hasWarning = (v) => 'Warning message'

                vm.runValidations('')

                expect(vm.states).toEqual({
                    focused: false,
                    error: false,
                    warning: true,
                    valid: false,
                    disabled: false,
                })
            })

            it('should set valid state', function () {
                vm.text = 'AAA'
                vm.isValid = (v) => true

                vm.runValidations('')

                expect(vm.states).toEqual({
                    focused: false,
                    error: false,
                    warning: false,
                    valid: true,
                    disabled: false,
                })
            })

            it('should set disabled state', function () {
                vm.disabled = true

                expect(vm.states).toEqual({
                    focused: false,
                    error: false,
                    warning: false,
                    valid: false,
                    disabled: true,
                })
            })
        })

        describe('inputType', () => {
            it('should be text by default', function () {
                expect(vm.inputType).toBe("text")
            })

            it('should toggle input type for password', function () {
                vm.type = 'password'

                expect(vm.inputType).toBe("password")
                vm.passwordVisible = true
                expect(vm.inputType).toBe("text")
            })
        })

        describe('mappedLabelText', () => {
            it('should be empty when not focused', function () {
                expect(vm.mappedLabelText).toBe("")
            })

            it('should be label when focused', function () {
                vm.focused = true
                expect(vm.mappedLabelText).toBe("Label")
            })
        })

        describe('mappedPlaceholderText', () => {
            it('should be placeholder when focused', function () {
                vm.focused = true
                expect(vm.mappedPlaceholderText).toBe("Placeholder")
            })

            it('should be text or label when not focused', function () {
                vm.text = 'Value'

                expect(vm.mappedPlaceholderText).toBe("Value")
                vm.text = null
                expect(vm.mappedPlaceholderText).toBe("Label")
            })
        })

        describe('mappedHelperText', () => {
            it('should display validation message on error', function () {
                vm.isValid = (v) => 'this is wrong'

                vm.runValidations('')

                expect(vm.mappedHelperText).toBe("this is wrong")
            })

            it('should display validation message on warning', function () {
                vm.hasWarning = (v) => 'this is wrong'

                vm.runValidations('')

                expect(vm.mappedHelperText).toBe("this is wrong")
            })

            it('should display helper text otherwise', function () {
                vm.helperText = 'help'

                expect(vm.mappedHelperText).toBe("help")
            })
        })

        describe('mappedDisabledText', () => {
            it('should display disabled text', function () {
                vm.disabled = true
                vm.disabledText = 'this is disabled'

                expect(vm.mappedDisabledText).toBe("this is disabled")
            })

            it('should display nothing otherwise', function () {
                expect(vm.mappedDisabledText).toBe("")
            })
        })

        describe('currentLength', () => {
            it('should return current length when text is null', function () {
                vm.maxLength = 5
                vm.text = null
                expect(vm.currentLength).toBe(0)
            })

            it('should return current length', function () {
                vm.maxLength = 5
                vm.text = "Test"
                expect(vm.currentLength).toBe(4)
            })
        })
    })

    describe('methods', () => {
        describe('runValidations', () => {
            const alwaysInvalid = (v) => 'no'
            const alwaysValid = (v) => true

            it('should save error', function () {
                vm.isValid = alwaysInvalid
                vm.hasWarning = alwaysInvalid

                const isValid = vm.runValidations('')
                expect(vm.errorMessage).toBe('no')
                expect(vm.warningMessage).toBe(null)
                expect(isValid).toBe(false)
            })

            it('should save warning', function () {
                vm.isValid = alwaysValid
                vm.hasWarning = alwaysInvalid

                const isValid = vm.runValidations('')
                expect(vm.errorMessage).toBe(true)
                expect(vm.warningMessage).toBe('no')
                expect(isValid).toBe(false)
            })

            it('should be valid', function () {
                vm.isValid = alwaysValid
                vm.hasWarning = alwaysValid

                const isValid = vm.runValidations('')
                expect(vm.errorMessage).toBe(true)
                expect(vm.warningMessage).toBe(true)
                expect(isValid).toBe(true)
            })
        })

        describe('togglePasswordVisibility', () => {
            it('should toggle', function () {
                vm.type = 'password'

                expect(vm.passwordVisible).toBe(false)
                vm.togglePasswordVisibility()
                expect(vm.passwordVisible).toBe(true)
            })
        })
    })

    describe('watchers', () => {
        it('should emit on input', function (done) {
            spyOn(vm, '$emit')

            vm.onInput({ target: { value: 'text' } })
            Vue.nextTick(() => {
                expect(vm.$emit).toHaveBeenCalled()
                done()
            })
        })
    })
})
