import Multiselect from '@/stateless/multiselect.vue'
import Vue from 'vue'

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

    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })

    describe('computed', () => {
        describe('filteredOptions', ()=>{
            it('should filter options', function () {
                expect(vm.filteredOptions.length).toBe(3)
                vm.searchQuery = "2"
                expect(vm.filteredOptions.length).toBe(1)
                expect(vm.filteredOptions[0].label).toBe("option 2")

                vm.searchQuery = "option"
                expect(vm.filteredOptions.length).toBe(3)

                vm.searchQuery = "option "
                expect(vm.filteredOptions.length).toBe(3)
            })
        })
    })

    describe('methods', () => {
        describe('isChecked', () => {
            it('should be checked if checked contains id', function () {
                expect(vm.isChecked(1)).toBe(false)
                vm.checked.push(1)
                expect(vm.isChecked(1)).toBe(true)
            })
        })

        describe('setChecked', () => {
            it('should set checked', function () {
                expect(vm.isChecked(1)).toBe(false)
                vm.setChecked(1, true)
                expect(vm.isChecked(1)).toBe(true)
            })

            it('should set checkedForSorting with 350ms delay', function (done) {
                expect(vm.isChecked(1)).toBe(false)
                vm.setChecked(1, true)
                expect(vm.isChecked(1)).toBe(true)
                expect(vm.checkedForSorting.includes(1)).toBe(false)
                setTimeout(()=>{
                    expect(vm.checkedForSorting.includes(1)).toBe(true)
                    done()
                }, 375)
            })
        })

        describe('selectAll', () => {
            it('should set all to checked', function () {
                expect(vm.isChecked(1)).toBe(false)
                expect(vm.isChecked(2)).toBe(false)
                expect(vm.isChecked(3)).toBe(false)
                vm.selectAll()
                expect(vm.isChecked(1)).toBe(true)
                expect(vm.isChecked(2)).toBe(true)
                expect(vm.isChecked(3)).toBe(true)
            })
        })

        describe('clearAll', () => {
            it('should set all to not checked', function () {
                vm.selectAll()
                expect(vm.isChecked(1)).toBe(true)
                expect(vm.isChecked(2)).toBe(true)
                expect(vm.isChecked(3)).toBe(true)
                vm.clearAll()
                expect(vm.isChecked(1)).toBe(false)
                expect(vm.isChecked(2)).toBe(false)
                expect(vm.isChecked(3)).toBe(false)
            })
        })
    })
})
