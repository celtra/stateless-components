import { DialogButton } from '@/library.js'
import Vue from 'vue'
import snapshotMixin from '../component_snapshot_mixin'

const Constructor = Vue.extend(DialogButton)
let vm = null

describe('DialogButton', () => {
    beforeEach(() => {
        vm = new Constructor({
            propsData: {},
        }).$mount()
    })

    snapshotMixin(DialogButton)

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
