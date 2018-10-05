import FileUpload from '@/stateless/file_upload.vue'
import Vue from 'vue'
import { getFlatUsecases } from '@/component_utils'
import snapshotMixin from '../component_snapshot_mixin'

const Constructor = Vue.extend(FileUpload)
let vm = null

describe('FileUpload', () => {
    beforeEach(() => {
        vm = new Constructor({
            propsData: getFlatUsecases(FileUpload)[0].data,
        }).$mount()
    })

    snapshotMixin(FileUpload)

    describe('computed', () => {
        describe('states', () => {
            it('should be normal initially', function () {
                expect(vm.states.normal).toBe(true)
                expect(vm.states.uploading).toBe(false)
                expect(vm.states.uploaded).toBe(false)
                expect(vm.states.error).toBe(false)
            })

            it('should be uploading if uploading', function () {
                vm.file = { name: 'a' }

                expect(vm.states.normal).toBe(false)
                expect(vm.states.uploading).toBe(true)
                expect(vm.states.uploaded).toBe(false)
                expect(vm.states.error).toBe(false)
            })

            it('should be uploaded if uploaded', function () {
                vm.file = { name: 'a', thumbnailUrl: 'b' }
                vm.uploadFinished = true

                expect(vm.states.normal).toBe(false)
                expect(vm.states.uploading).toBe(false)
                expect(vm.states.uploaded).toBe(true)
                expect(vm.states.error).toBe(false)
            })

            it('should be dropping file no matter other states', function () {
                vm.dropActive = true

                expect(vm.states).toEqual({ droppingFile: true })

                vm.progress = 10
                expect(vm.states).toEqual({ droppingFile: true })

                vm.error = 'error'
                expect(vm.states).toEqual({ droppingFile: true })
            })
        })

        describe('progressDashoffset', () => {
            it('should calculate progress dashoffset', function () {
                expect(vm.progressDashoffset).toBe(240)

                vm.progress = 10
                expect(vm.progressDashoffset).toBe(0.9 * 240)

                vm.progress = 40
                expect(vm.progressDashoffset).toBe(0.6 * 240)
            })
        })

        describe('fileInputSquareModifiers', function () {
            it('should set empty to true if hash is empty', function () {
                const fileInputSquareModifiers = vm.fileInputSquareModifiers

                expect(fileInputSquareModifiers['empty']).toBe(true)
                expect(fileInputSquareModifiers['error']).toBe(false)
                expect(fileInputSquareModifiers['clickable']).toBe(true)
            })

            it('should set empty to false if hash is set', function () {
                vm.file = { name: 'a', thumbnailUrl: 'b' }
                vm.uploadFinished = true

                const fileInputSquareModifiers = vm.fileInputSquareModifiers
                expect(fileInputSquareModifiers['empty']).toBe(false)
                expect(fileInputSquareModifiers['error']).toBe(false)
                expect(fileInputSquareModifiers['clickable']).toBe(false)
            })
        })
    })

    describe('methods', () => {
        describe('openUploadDialog', () => {
            it('should open', function () {
                vm.$refs.fileInput = { click: jasmine.createSpy('click') }

                vm.openUploadDialog()
                expect(vm.$refs.fileInput.click).toHaveBeenCalled()
            })

            it('should open if error', function () {
                vm.$refs.fileInput = { click: jasmine.createSpy('click') }

                vm.internalError = 'a'
                vm.openUploadDialog()
                expect(vm.$refs.fileInput.click).toHaveBeenCalled()
            })

            it('should not open if uploading', function () {
                vm.file = { name: 'a' }
                vm.$refs.fileInput = { click: jasmine.createSpy('click') }

                vm.openUploadDialog()
                expect(vm.$refs.fileInput.click).not.toHaveBeenCalled()
            })
        })

        describe('selectFile', () => {
            it('should reset state for new file', function () {
                spyOn(vm, 'removeFile')

                vm.selectFile({ type: '' })
                expect(vm.removeFile).toHaveBeenCalled()
            })

            it('should emit file selected', function () {
                const mockFile = { mock: 'file', type: 'text/plain' }

                vm.$refs.fileInput = { value: 'mock value' }

                spyOn(vm, '$emit')

                vm.selectFile(mockFile)
                expect(vm.$emit).toHaveBeenCalledWith('file-selected', mockFile)
            })
        })

        describe('removeFile', () => {
            it('should unset hash and emit', function () {
                spyOn(vm, '$emit')

                vm.$refs.fileInput = { value: 'mock value' }

                vm.removeFile()
                expect(vm.$refs.fileInput.value).toBe('')
                expect(vm.$emit).toHaveBeenCalledWith('remove-file')
                expect(vm.$emit).toHaveBeenCalledWith('update', {})
            })
        })

        describe('cleanupAndOpenUploadDialog', () => {
            it('should unset hash, emit and then open upload dialog', function () {
                vm.$refs.fileInput = {
                    click: jasmine.createSpy('click'),
                    value: 'mock value',
                }

                spyOn(vm, '$emit')
                spyOn(vm, 'openUploadDialog')

                vm.cleanupAndOpenUploadDialog()
                expect(vm.$refs.fileInput.value).toBe('')
                expect(vm.$emit).toHaveBeenCalledWith('remove-file')
                expect(vm.openUploadDialog).toHaveBeenCalled()
            })
        })

        describe('blur', function () {
            it('should blur current element', function () {
                spyOn(vm.$el, 'blur')
                vm.blur()
                expect(vm.$el.blur).toHaveBeenCalled()
            })
        })
    })
})
