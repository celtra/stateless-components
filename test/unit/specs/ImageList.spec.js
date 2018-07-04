import ImageList from '@/stateless/image_list.vue'
import Vue from 'vue'
import components from '@/components'

const Constructor = Vue.extend(ImageList)
const vm = new Constructor({
    propsData: components.ImageList.defaultProps,
}).$mount()

describe('ImageList', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
