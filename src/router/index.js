import Vue from 'vue'
import Router from 'vue-router'
import ComponentsList from '@/components/ComponentsList'
import ComponentView from '@/components/ComponentView'
import ComponentVariations from '@/components/ComponentVariations'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'ComponentsList',
            component: ComponentsList,
        },
        {
            path: '/:component',
            name: 'ComponentVariations',
            component: ComponentVariations,
        },
        {
            path: '/:component/view',
            name: 'ComponentView',
            component: ComponentView,
        },
    ],
})
