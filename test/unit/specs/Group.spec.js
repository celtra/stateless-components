import Group from '@/stateless/group.vue'
import Vue from 'vue'
import { getFlatUsecases } from '@/component_utils'

const Constructor = Vue.extend(Group)
const vm = new Constructor({
    propsData: getFlatUsecases(Group)[0],
}).$mount()

describe('Group', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
