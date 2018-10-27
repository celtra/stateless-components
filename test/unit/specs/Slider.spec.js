import { Slider } from '@/library.js'
import Vue from 'vue'
import snapshotMixin from '../component_snapshot_mixin'

const Constructor = Vue.extend(Slider)
let vm = null
const dragEvent = { clientX: 300, preventDefault: () => {} }

describe('Slider', () => {
    beforeEach(() => {
        vm = new Constructor({
            propsData: {
                min: 0.1,
                max: 10,
                step: 0.1,
                theme: 'light',
                size: 'normal',
                label: 'Basic slider',
                value: 5,
                unit: '%',
                alignment: 'right',
            },
        }).$mount()

        vm.isDomReady = false
        vm.$refs.bar = { clientWidth: 300, getBoundingClientRect: () => {
            return { x: 160 }
        }, focus: () => {} }
    })

    snapshotMixin(Slider)

    describe('computed', () => {
        describe('limitValue', () => {
            it('should be max', () => {
                expect(vm.limitValue).toBe(10)
            })

            it('should be limit', () => {
                vm.limit = 8

                expect(vm.limitValue).toBe(8)
            })
        })

        describe('minLabelValue', () => {
            it('should be min', () => {
                expect(vm.minLabelValue).toBe('0.1')
            })

            it('should be minLabel', () => {
                vm.minLabel = 'minLabel'

                expect(vm.minLabelValue).toBe('minLabel')
            })
        })

        describe('maxLabelValue', () => {
            it('should be limitValue', () => {
                expect(vm.maxLabelValue).toBe('10')
            })

            it('should be maxLabel', () => {
                vm.maxLabel = 'maxLabel'

                expect(vm.maxLabelValue).toBe('maxLabel')
            })
        })

        describe('stepsCount', () => {
            it('should be 99', () => {
                expect(vm.stepsCount).toBe(99)
            })
        })

        describe('position', () => {
            it('should be 0', () => {
                expect(vm.position).toBe(0)
            })

            it('should not be close to 148.48', () => {
                vm.isDomReady = true

                expect(vm.position).toBeCloseTo(148.48)
            })
        })

        describe('sliderWidth', () => {
            it('should be zero', () => {
                expect(vm.sliderWidth).toBe(0)
            })

            it('should be some positive number', () => {
                vm.isDomReady = true

                expect(vm.sliderWidth).toBe(300)
            })
        })

        describe('decimalPlacesCount', () => {
            it('should be 1', () => {
                expect(vm.decimalPlacesCount).toBeCloseTo(1)
            })

            it('should be 0', () => {
                vm.min = 0
                vm.step = 1

                expect(vm.decimalPlacesCount).toBe(0)
            })
        })

        describe('isWholeNumber', () => {
            it('should be false', () => {
                expect(vm.isWholeNumber).toBe(false)
            })

            it('should be true', () => {
                vm.min = 0
                vm.step = 1

                expect(vm.isWholeNumber).toBe(true)
            })
        })

        describe('lastActiveIndex', () => {
            it('should be close to 9.4', () => {
                expect(vm.lastActiveIndex).toBeCloseTo(9.4)
            })
        })

        describe('labelsActiveClass', () => {
            it('should be min === true, max === false', () => {
                expect(vm.labelsActiveClass).toEqual({
                    min: { active: true },
                    max: { active: false },
                })
            })
        })
    })

    describe('methods', () => {
        describe('startDrag', () => {
            it('should return undefined', () => {
                vm.disabled = true

                expect(vm.startDrag(dragEvent)).toBeUndefined()
            })

            it('should set isChanged and isDragging to true', () => {
                spyOn(vm, 'setPosition')

                vm.startDrag(dragEvent)
                expect(vm.isChanged).toBe(true)
                expect(vm.isDragging).toBe(true)
                expect(vm.setPosition).toHaveBeenCalled()
            })
        })

        describe('setPosition', () => {
            it('should emit new value', () => {
                spyOn(vm, '$emit')

                vm.setPosition(dragEvent)
                expect(vm.$emit).toHaveBeenCalledWith('input', 10)
            })
        })

        describe('stopDrag', () => {
            it('should set isDragging to false', () => {
                vm.stopDrag()
                expect(vm.isDragging).toBe(false)
            })
        })

        describe('handleStepDecrease', () => {
            it('should emit decreased value', () => {
                spyOn(vm, '$emit')
                vm.handleStepDecrease()
                expect(vm.$emit).toHaveBeenCalled()
            })

            it ('should not emit anything', () => {
                vm.value = 0.1

                spyOn(vm, '$emit')
                vm.handleStepDecrease()
                expect(vm.$emit).not.toHaveBeenCalled()
            })
        })

        describe('handleStepIncrease', () => {
            it('should emit increased value', () => {
                spyOn(vm, '$emit')
                vm.handleStepIncrease()
                expect(vm.$emit).toHaveBeenCalled()
            })

            it ('should not emit anything', () => {
                vm.value = 100

                spyOn(vm, '$emit')
                vm.handleStepIncrease()
                expect(vm.$emit).not.toHaveBeenCalled()
            })
        })

        describe('handleInput', () => {
            it('should proxy event', () => {
                spyOn(vm, '$emit')
                vm.handleInput('value')
                expect(vm.$emit).toHaveBeenCalledWith('input', 'value')
            })
        })

        describe('isValidInput', () => {
            it('should be null', () => {
                expect(vm.isValidInput(5)).toBeNull()
            })

            it('should be empty string', () => {
                expect(vm.isValidInput(0)).toBe('')
            })

            it('should be empty string', () => {
                expect(vm.isValidInput(101)).toBe('')
            })
        })

        describe('tickClass', () => {
            it('should be active and hidden', () => {
                vm.isDomReady = true

                expect(vm.tickClass(1)).toEqual({
                    'active': true,
                    'hidden': true,
                })
            })

            it('should be inactive and shown', () => {
                vm.isDomReady = true

                expect(vm.tickClass(15)).toEqual({
                    'active': false,
                    'hidden': false,
                })
            })
        })
    })
})
