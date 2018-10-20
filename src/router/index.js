import Vue from 'vue'
import Router from 'vue-router'
import ComponentsList from '@/components/ComponentsList'
import ComponentView from '@/components/ComponentView'
import ComponentPage from '@/components/ComponentPage'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'ComponentsList',
            component: ComponentsList,
        },
        {
            path: '/:component/:filters?',
            name: 'ComponentPage',
            component: ComponentPage,
        },
        {
            path: '/:component/view',
            name: 'ComponentView',
            component: ComponentView,
        },
    ],
})
