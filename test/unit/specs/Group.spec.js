import Group from '@/stateless/group.vue'
import Vue from 'vue'

const Constructor = Vue.extend(Group)
const vm = new Constructor({
    propsData: Group.usecases[0],
}).$mount()

describe('Group', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
