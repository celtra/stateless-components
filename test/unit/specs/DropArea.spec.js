import DropArea from '@/stateless/drop_area.vue'
import Vue from 'vue'
import { getFlatUsecases } from '@/component_utils'

const vm = new Vue({
    render (h) {
        return h('div', {}, [
            h(DropArea, { props: getFlatUsecases(DropArea)[0].data }),
        ])
    },
}).$mount()

describe('DropArea', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
