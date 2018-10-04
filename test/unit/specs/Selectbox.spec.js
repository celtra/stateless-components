import Selectbox from '@/stateless/selectbox.vue'
import Vue from 'vue'
import snapshotMixin from '../component_snapshot_mixin'

const Constructor = Vue.extend(Selectbox)
let vm = null

describe('Selectbox', () => {
    beforeEach (function () {
        vm = new Constructor({
            propsData: {
                label          : "Label",
                placeholder    : "Placeholder",
                options        : [],
                selected       : null,
                isSearchable   : true,
                isUnselectable : false,
            },
        }).$mount()
    })

    snapshotMixin(Selectbox)

    describe('computed', function () {
        describe('states', function () {
            it('should be in default state', function () {
                expect(vm.states).toEqual({
                    error    : false,
                    warning  : false,
                    disabled : false,
                    selected : true,
                    focused  : false,
                })
            })

            it('should be error', function () {
                vm.errorText = 'error'

                expect(vm.states).toEqual({
                    error    : true,
                    warning  : false,
                    disabled : false,
                    selected : true,
                    focused  : false,
                })
            })
        })

        describe('mappedLabelText', function () {
            it('should be label prop', function () {
                expect(vm.mappedLabelText).toBe("Label")
            })
        })

        describe('selectedLabelText', function () {
            it('should be placeholder prop', function () {
                expect(vm.selectedLabelText).toBe("Placeholder")
            })

            it('should be selected option', function () {
                vm.options = [{ name : "Group A", items: [{ id: '1', label: 'OptionA' }] }]
                vm.value = '1'
                expect(vm.selectedLabelText).toBe("OptionA")
            })
        })

        describe('selectedMetadataText', function () {
            it('should hide metadata', function () {
                vm.showSelectedMetadata = false

                expect(vm.selectedMetadataText).toBe("")
            })

            it('should be empty if no option', function () {
                vm.showSelectedMetadata = true

                expect(vm.selectedMetadataText).toBe("")
            })

            it('should be option metadata', function () {
                vm.showSelectedMetadata = true
                vm.options = [{ name : "Group A", items: [{ id: '1', label: 'OptionA', metadata: 'Test' }] }]
                vm.value = '1'

                expect(vm.selectedMetadataText).toBe("Test")
            })
        })

        describe('mappedHelperText', function () {
            it('should be validation prop', function () {
                vm.errorText = 'Validate me again'

                expect(vm.mappedHelperText).toBe("Validate me again")
            })

            it('should be helper prop', function () {
                vm.helperText = 'This is an example helper text'

                expect(vm.mappedHelperText).toBe("This is an example helper text")
            })
        })

        describe('mappedDisabledText', function () {
            it('should be empty', function () {
                expect(vm.mappedDisabledText).toBe("")
            })

            it('should be prop text', function () {
                vm.disabled = true
                vm.disabledText = 'This is disabled'

                expect(vm.mappedDisabledText).toBe("This is disabled")
            })
        })

        describe('listItems', function () {
            it('should not filter if empty search query', function () {
                let options = [
                    { label : "GROUP A", items : [{ id : 1, label : "Option A" }, { id : 2, label : "Option B" }] },
                    { label : "GROUP B", items : [{ id : 3, label : "Option C" }, { id : 4, label : "Option E" }] },
                    { label : "GROUP C", items : [{ id : 5, label : "Option D" }] },
                ]
                vm.options = options

                vm.searchTextValue = ''
                expect(vm.listItems).toEqual(options)
            })

            it('should filter single option', function () {
                vm.options = [
                    { label : "GROUP A", items : [{ id : 1, label : "Option A" }, { id : 2, label : "Option B" }] },
                    { label : "GROUP B", items : [{ id : 3, label : "Option C" }, { id : 4, label : "Option E" }] },
                    { label : "GROUP C", items : [{ id : 5, label : "Option D" }] },
                ]

                vm.searchTextValue = 'Option E'
                expect(vm.listItems.length).toBe(1)
                expect(vm.listItems[0].items.length).toBe(1)
            })

            it('should filter everything', function () {
                vm.options = [
                    { label : "GROUP A", items : [{ id : 1, label : "Option A" }, { id : 2, label : "Option B" }] },
                    { label : "GROUP B", items : [{ id : 3, label : "Option C" }, { id : 4, label : "Option E" }] },
                    { label : "GROUP C", items : [{ id : 5, label : "Option D" }] },
                ]

                vm.searchTextValue = 'Something'
                expect(vm.listItems).toEqual([])
            })
        })
    })

    describe('methods', function () {
        describe('setFocus', function () {
            it('should open list', function () {
                vm.focused = false
                spyOn(vm, '$emit')

                vm.setFocus()
                expect(vm.focused).toBe(true)
                expect(vm.$emit).toHaveBeenCalledWith('focus')
            })
        })

        describe('clearFocus', function () {
            it('should set focused to false', function () {
                vm.focused = true

                vm.clearFocus()
                expect(vm.focused).toBe(false)
            })
        })

        describe('handleEsc', function () {
            it('should focus if component was opened', function () {
                spyOn(vm.$el, 'focus')
                spyOn(vm.$el, 'blur')
                spyOn(vm, 'closeSelectList')
                spyOn(vm, 'clearFocus')

                vm.isOpen = true

                vm.handleEsc()

                expect(vm.closeSelectList).toHaveBeenCalled()
                expect(vm.$el.focus).toHaveBeenCalled()
                expect(vm.$el.blur).not.toHaveBeenCalled()
                expect(vm.clearFocus).not.toHaveBeenCalled()
            })

            it('should lose focus if component was not opened', function () {
                spyOn(vm.$el, 'focus')
                spyOn(vm.$el, 'blur')
                spyOn(vm, 'closeSelectList')
                spyOn(vm, 'clearFocus')

                vm.isOpen = false

                vm.handleEsc()

                expect(vm.closeSelectList).toHaveBeenCalled()
                expect(vm.$el.focus).not.toHaveBeenCalled()
                expect(vm.$el.blur).toHaveBeenCalled()
                expect(vm.clearFocus).toHaveBeenCalled()
            })
        })

        describe('openSelectList', function () {
            it('should do nothing if state is disabled', function () {
                spyOn(vm, '$emit')
                spyOn(vm, 'onScroll')

                vm.disabled = true
                vm.isOpen = false

                vm.openSelectList()

                expect(vm.isOpen).toBe(false)
                expect(vm.$emit).not.toHaveBeenCalled()
                expect(vm.onScroll).not.toHaveBeenCalled()
            })

            it('should open list and emit focus', function (done) {
                spyOn(vm, '$emit')
                spyOn(vm, 'onScroll')

                vm.isOpen = false
                vm.focused = false
                vm.isSearchable = false

                vm.openSelectList()

                expect(vm.isOpen).toBe(true)
                expect(vm.$emit).toHaveBeenCalledWith('focus')

                vm.$nextTick(() => {
                    expect(vm.onScroll).toHaveBeenCalledWith(0)
                    done()
                })
            })

            it('should open already focused list', function (done) {
                spyOn(vm, '$emit')
                spyOn(vm, 'onScroll')

                vm.isOpen = false
                vm.focused = true
                vm.isSearchable = false

                vm.openSelectList()

                expect(vm.isOpen).toBe(true)
                expect(vm.$emit).not.toHaveBeenCalled()

                vm.$nextTick(() => {
                    expect(vm.onScroll).toHaveBeenCalledWith(0)
                    done()
                })
            })

            it('should focus on search input', function (done) {
                spyOn(vm, '$emit')
                spyOn(vm, 'onScroll')

                // Mount will load $el so that getElementByClassName does not throw error
                vm.$mount()

                vm.isOpen = false
                vm.focused = true
                vm.isSearchable = true

                vm.openSelectList()

                expect(vm.isOpen).toBe(true)
                expect(vm.$emit).not.toHaveBeenCalled()

                vm.$nextTick(() => {
                    expect(vm.onScroll).toHaveBeenCalledWith(0)
                    done()
                })
            })
        })

        describe('closeSelectList', function () {
            it('should close list', function () {
                spyOn(vm.$el, 'focus')

                vm.focused = false
                vm.isOpen = true
                vm.activeId = 1

                vm.closeSelectList()
                expect(vm.focused).toBe(true)
                expect(vm.isOpen).toBe(false)
                expect(vm.activeId).toBeNull()
                expect(vm.$el.focus).toHaveBeenCalled()
            })
        })

        describe('sizeModifiers', function () {
            it('should set default size', function () {
                expect(vm.size).toEqual('normal')
            })

            it('should set size', function () {
                vm.size = 'condensed'

                expect(vm.size).toEqual('condensed')
            })
        })

        describe('selectValue', function () {
            it('should clear when value is CLEAR_SELECTION', function () {
                spyOn(vm, 'closeSelectList')
                spyOn(vm, '$emit')

                vm.selectValue({ id: 'CLEAR_SELECTION' })

                expect(vm.closeSelectList).toHaveBeenCalled()
                expect(vm.$emit).toHaveBeenCalledWith('input', null)
            })

            it('should emit id', function () {
                spyOn(vm, 'closeSelectList')
                spyOn(vm, '$emit')

                vm.selectValue({ id: '1' })

                expect(vm.closeSelectList).toHaveBeenCalled()
                expect(vm.$emit).toHaveBeenCalledWith('input', '1')
            })
        })
    })
})
