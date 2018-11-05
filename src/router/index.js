import Vue from 'vue'
import Router from 'vue-router'
import ComponentPage from '@/components/ComponentPage'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/:component?/:filters?',
            name: 'ComponentPage',
            component: ComponentPage,
        },
    ],
})
