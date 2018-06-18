import Vue from 'vue'
import Router from 'vue-router'
import ComponentsList from '@/components/ComponentsList'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'ComponentsList',
            component: ComponentsList,
        },
    ],
})
