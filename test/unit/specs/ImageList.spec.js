import ImageList from '@/stateless/image_list.vue'
import Vue from 'vue'

const Constructor = Vue.extend(ImageList)
const vm = new Constructor({
    propsData: ImageList.usecases[0],
}).$mount()

describe('ImageList', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
