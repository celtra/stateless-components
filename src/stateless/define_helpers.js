import Vue from 'vue'
import * as filters from '@/helpers/filters.js'
import * as directives from '@/helpers/directives.js'

Vue.filter('capitalize', filters.capitalize)
Vue.filter('uppercase', filters.uppercase)
Vue.filter('prefix', filters.prefix)
Vue.filter('slugify', filters.slugify)
Vue.filter('middleEllipsis', filters.middleEllipsis)

Vue.directive('focus', directives.focus)
Vue.directive('clickOutside', directives.clickOutside)
