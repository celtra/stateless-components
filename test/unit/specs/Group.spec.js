import Group from '@/stateless/group.vue'
import Vue from 'vue'
import components from '@/components'

const Constructor = Vue.extend(Group)
const vm = new Constructor({
    propsData: components.Group.defaultProps,
}).$mount()

describe('Group', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
