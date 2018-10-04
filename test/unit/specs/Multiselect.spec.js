import Multiselect from '@/stateless/multiselect.vue'
import Vue from 'vue'
import snapshotMixin from '../component_snapshot_mixin'

const Constructor = Vue.extend(Multiselect)
let vm = null

Vue.component('transition-group', {
    render (createElement) {
        return createElement('div', this.$slots.default)
    },
})

describe('Multiselect', () => {
    beforeEach(function () {
        vm = new Constructor({
            propsData: {
                value: [],
                options: [
                    { id: 1, label: "option 1" },
                    { id: 2, label: "option 2" },
                    { id: 3, label: "option 3" },
                ],
                isSearchable: true,
            },
        }).$mount()
    })

    snapshotMixin(Multiselect)

    describe('computed', () => {
        describe('allOptions', ()=>{
            it('should filter options', function () {
                expect(vm.allOptions.length).toBe(3)
                vm.searchQuery = "2"
                expect(vm.allOptions.length).toBe(1)
                expect(vm.allOptions[0].label).toBe("option 2")

                vm.searchQuery = "option"
                expect(vm.allOptions.length).toBe(3)

                vm.searchQuery = "option "
                expect(vm.allOptions.length).toBe(3)
            })
        })
    })

    describe('methods', () => {
        describe('isChecked', () => {
            it('should be checked if checked contains id', function () {
                expect(vm.isChecked(1)).toBe(false)
                vm.value.push(1)
                expect(vm.isChecked({ id: 1 })).toBe(true)
            })
        })

        describe('setChecked', () => {
            it('should set checked', function () {
                spyOn(vm, '$emit')
                expect(vm.isChecked({ id: 1 })).toBe(false)
                vm.setChecked({ id: 1 }, true)
                expect(vm.$emit).toHaveBeenCalledWith('input', [1])
            })
        })

        describe('setMultiple', () => {
            it('should select all', function () {
                spyOn(vm, '$emit')

                expect(vm.isChecked({ id: 1 })).toBe(false)
                expect(vm.isChecked({ id: 2 })).toBe(false)
                expect(vm.isChecked({ id: 3 })).toBe(false)
                vm.setMultiple(true)
                expect(vm.$emit).toHaveBeenCalledWith('input', [1, 2, 3])
            })

            it('should clear all', function () {
                spyOn(vm, '$emit')

                vm.value = ['1', '2', '3']
                vm.setMultiple(false)
                expect(vm.$emit).toHaveBeenCalledWith('input', [])
            })
        })
    })
})
