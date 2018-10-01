import DialogHeader from '@/stateless/dialog_header.vue'
import Vue from 'vue'
import components from '@/components'

const Constructor = Vue.extend(DialogHeader)
let vm = null

describe.only('DialogHeader', () => {
    beforeEach(() => {
        vm = new Constructor({
            propsData: {
                dialogViewState: 'open',
                steps: [
                    { id: 'product', passiveLabel: 'Select a product', activeLabel: 'Product A' },
                    { id: 'format', passiveLabel: 'Select a format', activeLabel: 'Format A' },
                    { id: 'finalize', passiveLabel: 'Finalize', activeLabel: 'Finalize' },
                ],
                currentStepId: 'format',
                isCreativeValid: false,
            },
        }).$mount()
    })

    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })

    describe('computed', () => {
        describe('shownSteps', () => {
            it('should set correct labels and isActive', function () {
                expect(vm.shownSteps).toEqual([
                    { id: 'product', label: 'Product A', isActive: false },
                    { id: 'format', label: 'Select a format', isActive: true },
                    { id: 'finalize', label: 'Finalize', isActive: false },
                ])

                vm.currentStepId = 'finalize'
                expect(vm.shownSteps).toEqual([
                    { id: 'product', label: 'Product A', isActive: false },
                    { id: 'format', label: 'Format A', isActive: false },
                    { id: 'finalize', label: 'Finalize', isActive: true },
                ])
            })
        })

        describe('stepIndex', () => {
            it('should return current step index', function () {
                expect(vm.stepIndex).toBe(1)
                vm.currentStepId = 'finalize'
                expect(vm.stepIndex).toBe(2)
            })
        })
    })

    describe('methods', () => {
        describe('previousStep', () => {
            it('shouls emit previus step event', function () {
                spyOn(vm, '$emit')
                vm.previousStep()
                expect(vm.$emit).toHaveBeenCalledWith('previous-step')
            })
        })

        describe('closeDialog', () => {
            it('should emit close dialog event', function () {
                spyOn(vm, '$emit')
                vm.closeDialog()
                expect(vm.$emit).toHaveBeenCalledWith('close-dialog')
            })
        })
    })

    describe('watch', ()=>{
        describe('stepIndex', ()=>{
            it('should transition header on stepIndex change', function (done) {
                spyOn(vm, 'transitionHeader')

                vm.currentStepId = 'finalize'
                // One nextTick for watcher to run and another for $nextTick wrapped transitionHeader call in watcher to run
                Vue.nextTick(()=>{
                    Vue.nextTick(()=>{
                        expect(vm.transitionHeader).toHaveBeenCalled()
                        done()
                    })
                })
            })
        })
    })
})
