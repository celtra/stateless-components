import ImageList from '@/stateless/image_list.vue'
import Vue from 'vue'
import { getFlatUsecases } from '@/component_utils'

const Constructor = Vue.extend(ImageList)
const vm = new Constructor({
    propsData: getFlatUsecases(ImageList)[0].data,
}).$mount()

describe('ImageList', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
