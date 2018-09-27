import FileUploadRequirements from '@/stateless/file_upload_requirements.vue'
import Vue from 'vue'

const Constructor = Vue.extend(FileUploadRequirements)
const vm = new Constructor({
    propsData: FileUploadRequirements.usecases[0],
}).$mount()

describe('FileUploadRequirements', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
