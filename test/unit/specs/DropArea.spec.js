import { DropArea } from '@/library.js'
import Vue from 'vue'

const vm = new Vue({
    render (h) {
        return h('div', {}, [
            h(DropArea, { props: { dragActive: true } }),
        ])
    },
}).$mount()

describe('DropArea', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
