import FileUpload from '@/stateless/file_upload.vue'
import Vue from 'vue'
import components from '@/components'

const Constructor = Vue.extend(FileUpload)
const vm = new Constructor({
    propsData: components.FileUpload.defaultProps,
}).$mount()

describe('FileUpload', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
