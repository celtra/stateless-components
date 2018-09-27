import DropArea from '@/stateless/drop_area.vue'
import Vue from 'vue'

const vm = new Vue({
    render (h) {
        return h('div', {}, [
            h(DropArea, { props: DropArea.usecases[0] }),
        ])
    },
}).$mount()

fdescribe('DropArea', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
