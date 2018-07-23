import FileUploadRequirements from '@/stateless/file_upload_requirements.vue'
import Vue from 'vue'
import components from '@/components'

const Constructor = Vue.extend(FileUploadRequirements)
const vm = new Constructor({
    propsData: components.FileUploadRequirements.defaultProps,
}).$mount()

describe('FileUploadRequirements', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
