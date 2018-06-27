import DropArea from '@/stateless/drop_area.vue'
import '@/stateless/vue_helpers'
import Vue from 'vue'
import components from '@/components'

const vm = new Vue({
    render (h) {
        return h('div', {}, [
            h(DropArea, { props: components.DropArea.defaultProps }),
        ])
    },
}).$mount()

fdescribe('DropArea', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
