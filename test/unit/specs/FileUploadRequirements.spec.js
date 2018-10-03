import FileUploadRequirements from '@/stateless/file_upload_requirements.vue'
import Vue from 'vue'
import { getFlatUsecases } from '@/component_utils'

const Constructor = Vue.extend(FileUploadRequirements)
const vm = new Constructor({
    propsData: getFlatUsecases(FileUploadRequirements)[0].data,
}).$mount()

describe('FileUploadRequirements', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
