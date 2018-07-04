import Selectbox from '@/stateless/selectbox.vue'
import Vue from 'vue'

const Constructor = Vue.extend(Selectbox)
let vm = null

describe('Selectbox', () => {
    beforeEach (function () {
        vm = new Constructor({
            propsData: {
                label          : "Label",
                placeholder    : "Placeholder",
                groups         : [],
                selected       : null,
                isSearchable   : true,
                isUnselectable : false,
            },
        }).$mount()
    })

    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })

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
                vm.groups = [{ name : "Group A", options: [{ id: '1', label: 'OptionA' }] }]
                vm.selectedId = '1'
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
                vm.groups = [{ name : "Group A", options: [{ id: '1', label: 'OptionA', metadata: 'Test' }] }]
                vm.selectedId = '1'

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

        describe('filterGroups', function () {
            it('should not filter if empty search query', function () {

                let groups = [
                    { label : "Group A", options : [{ id : 1, label : "Option A" }, { id : 2, label : "Option B" }] },
                    { label : "Group B", options : [{ id : 3, label : "Option C" }, { id : 4, label : "Option E" }] },
                    { label : "Group C", options : [{ id : 5, label : "Option D" }] },
                ]
                vm.groups = groups

                vm.searchTextDebounced = ''
                expect(vm.filteredGroups).toEqual(groups)
            })

            it('should filter single option', function () {
                vm.groups = [
                    { label : "Group A", options : [{ id : 1, label : "Option A" }, { id : 2, label : "Option B" }] },
                    { label : "Group B", options : [{ id : 3, label : "Option C" }, { id : 4, label : "Option E" }] },
                    { label : "Group C", options : [{ id : 5, label : "Option D" }] },
                ]

                vm.searchTextDebounced = 'Option E'
                expect(vm.filteredGroups.length).toBe(1)
                expect(vm.filteredGroups[0].options.length).toBe(1)
            })

            it('should filter everything', function () {
                vm.groups = [
                    { label : "Group A", options : [{ id : 1, label : "Option A" }, { id : 2, label : "Option B" }] },
                    { label : "Group B", options : [{ id : 3, label : "Option C" }, { id : 4, label : "Option E" }] },
                    { label : "Group C", options : [{ id : 5, label : "Option D" }] },
                ]

                vm.searchTextDebounced = 'Something'
                expect(vm.filteredGroups).toEqual([])
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
                spyOn(vm, 'clearSearch')
                spyOn(vm, 'positionSelectList')

                vm.disabled = true
                vm.isOpen = false

                vm.openSelectList()

                expect(vm.isOpen).toBe(false)
                expect(vm.$emit).not.toHaveBeenCalled()
                expect(vm.positionSelectList).not.toHaveBeenCalled()
                expect(vm.clearSearch).not.toHaveBeenCalled()
            })

            it('should open list and emit focus', function (done) {
                spyOn(vm, '$emit')
                spyOn(vm, 'clearSearch')
                spyOn(vm, 'positionSelectList')

                vm.isOpen = false
                vm.focused = false
                vm.isSearchable = false

                vm.openSelectList()

                expect(vm.isOpen).toBe(true)
                expect(vm.$emit).toHaveBeenCalledWith('focus')

                vm.$nextTick(() => {
                    expect(vm.clearSearch).not.toHaveBeenCalled()
                    expect(vm.positionSelectList).toHaveBeenCalled()
                    done()
                })
            })

            it('should open already focused list', function (done) {
                spyOn(vm, '$emit')
                spyOn(vm, 'clearSearch')
                spyOn(vm, 'positionSelectList')

                vm.isOpen = false
                vm.focused = true
                vm.isSearchable = false

                vm.openSelectList()

                expect(vm.isOpen).toBe(true)
                expect(vm.$emit).not.toHaveBeenCalled()

                vm.$nextTick(() => {
                    expect(vm.clearSearch).not.toHaveBeenCalled()
                    expect(vm.positionSelectList).toHaveBeenCalled()
                    done()
                })
            })

            it('should focus on search input', function (done) {
                spyOn(vm, '$emit')
                spyOn(vm, 'clearSearch')
                spyOn(vm, 'positionSelectList')

                // Mount will load $el so that getElementByClassName does not throw error
                vm.$mount()

                vm.isOpen = false
                vm.focused = true
                vm.isSearchable = true

                vm.openSelectList()

                expect(vm.isOpen).toBe(true)
                expect(vm.$emit).not.toHaveBeenCalled()

                vm.$nextTick(() => {
                    expect(vm.clearSearch).toHaveBeenCalled()
                    expect(vm.positionSelectList).toHaveBeenCalled()
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

        describe('selectOption', function () {
            it('should not emit when selecting disabled option', function () {
                vm.groups = [{ name : "Group A", options: [ { id: '1', label: 'OptionA' }, { id: '2', label: 'OptionB', disabled: true } ] }]

                spyOn(vm, 'closeSelectList')
                spyOn(vm, '$emit')

                vm.selectOption('2')

                expect(vm.closeSelectList).not.toHaveBeenCalled()
                expect(vm.$emit).not.toHaveBeenCalled()
            })

            it('should emit when clearing option', function () {
                vm.groups = [{ name : "Group A", options: [ { id: '1', label: 'OptionA' }, { id: '2', label: 'OptionB', disabled: true } ] }]

                spyOn(vm, 'closeSelectList')
                spyOn(vm, '$emit')

                vm.selectOption(null)

                expect(vm.closeSelectList).toHaveBeenCalled()
                expect(vm.$emit).toHaveBeenCalledWith('input', null)
            })

            it('should emit', function () {
                vm.groups = [{ name : "Group A", options: [ { id: '1', label: 'OptionA' }, { id: '2', label: 'OptionB', disabled: true } ] }]

                spyOn(vm, 'closeSelectList')
                spyOn(vm, '$emit')

                vm.selectOption('1')

                expect(vm.closeSelectList).toHaveBeenCalled()
                expect(vm.$emit).toHaveBeenCalledWith('input', '1')
            })
        })

        describe('clearSearch', function () {
            it('should clear search', function () {
                vm.searchText = "Search me"
                vm.clearSearch()
                expect(vm.searchText).toBe('')
            })
        })

        describe('move', function () {
            it('should set active option', function () {
                vm.groups = [
                    { label : "Group A", options : [{ id : '1', label: 'A', disabled : false }, { id : '2', label: 'B', disabled : true }] },
                    { label : "Group B", options : [{ id : '3', label: 'C', disabled : false }] },
                ]
                vm.isOpen = true

                spyOn(vm, 'openSelectList')
                spyOn(vm, '$nextTick')

                vm.move(1)

                expect(vm.activeId).toEqual('1')
                expect(vm.openSelectList).not.toHaveBeenCalledWith()
                expect(vm.$nextTick).toHaveBeenCalled()
            })

            it('should reset active index to first', function () {
                vm.groups = [
                    { label : "Group A", options : [{ id : '1', label: 'A', disabled : false }, { id : '2', label: 'B', disabled : true }] },
                    { label : "Group B", options : [{ id : '3', label: 'C', disabled : false }] },
                ]
                vm.isOpen = true

                spyOn(vm, 'openSelectList')
                spyOn(vm, '$nextTick')

                vm.activeId = '1'
                vm.move(-1)

                expect(vm.activeId).toBe('1')
                expect(vm.openSelectList).not.toHaveBeenCalledWith()
                expect(vm.$nextTick).toHaveBeenCalled()
            })

            it('should reset active index to last', function () {
                vm.groups = [
                    { label : "Group A", options : [{ id : '1', label: 'A', disabled : false }, { id : '2', label: 'B', disabled : true }] },
                    { label : "Group B", options : [{ id : '3', label: 'C', disabled : false }] },
                ]
                vm.isOpen = true

                spyOn(vm, 'openSelectList')
                spyOn(vm, '$nextTick')

                vm.activeId = '1'
                vm.move(1)

                expect(vm.activeId).toBe('3')
                expect(vm.openSelectList).not.toHaveBeenCalledWith()
                expect(vm.$nextTick).toHaveBeenCalled()
            })

            it('it should open list if it is closed', function () {
                vm.groups = [
                    { label : "Group A", options : [{ id : '1', label: 'A', disabled : false }, { id : '2', label: 'B', disabled : true }] },
                    { label : "Group B", options : [{ id : '3', label: 'C', disabled : false }] },
                ]
                vm.isOpen = true

                spyOn(vm, 'openSelectList')
                spyOn(vm, '$nextTick')

                vm.isOpen = false
                vm.move(1)

                expect(vm.activeId).toEqual('1')
                expect(vm.openSelectList).toHaveBeenCalledWith()
                expect(vm.$nextTick).toHaveBeenCalled()
            })
        })

        describe('selectActiveOption', function () {
            it('should not select empty option', function () {
                vm.groups = [{ name : "Group A", options: [ { id: '1', label: 'OptionA' }, { id: '2', label: 'OptionB', disabled: true }] }]

                spyOn(vm, 'openSelectList')
                spyOn(vm, 'closeSelectList')
                spyOn(vm, 'selectOption')

                vm.isOpen = true
                vm.activeId = null
                vm.selectActiveOption()

                expect(vm.openSelectList).not.toHaveBeenCalled()
                expect(vm.closeSelectList).not.toHaveBeenCalled()
                expect(vm.selectOption).not.toHaveBeenCalled()
            })

            it('should select active option', function () {
                vm.groups = [{ name : "Group A", options: [ { id: '1', label: 'OptionA' }, { id: '2', label: 'OptionB', disabled: true }] }]

                spyOn(vm, 'openSelectList')
                spyOn(vm, 'closeSelectList')
                spyOn(vm, 'selectOption')

                vm.isOpen = true
                vm.activeId = '1'
                vm.selectActiveOption()

                expect(vm.openSelectList).not.toHaveBeenCalled()
                expect(vm.selectOption).toHaveBeenCalledWith('1')
                expect(vm.closeSelectList).toHaveBeenCalled()
            })

            it('should open select list', function () {
                vm.groups = [{ name : "Group A", options: [ { id: '1', label: 'OptionA' }, { id: '2', label: 'OptionB', disabled: true }] }]

                spyOn(vm, 'openSelectList')
                spyOn(vm, 'closeSelectList')
                spyOn(vm, 'selectOption')

                vm.isOpen = false
                vm.selectActiveOption()

                expect(vm.openSelectList).toHaveBeenCalled()
                expect(vm.selectOption).not.toHaveBeenCalled()
                expect(vm.closeSelectList).not.toHaveBeenCalled()
            })
        })
    })
})
