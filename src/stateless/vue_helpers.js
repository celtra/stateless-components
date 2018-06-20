import Vue from 'vue'

Vue.filter('capitalize', (value) => {
    return value[0].toUpperCase() + value.slice(1)
})

Vue.filter('uppercase', (value) => {
    return value.toUpperCase()
})

Vue.filter('prefix', (value, prefix) => {
    if (value == null) {
        return null
    }

    if (Array.isArray(value)) {
        return value.map((item) => prefix + item)
    } else if (typeof (value) === 'object') {
        let prefixed = {}
        for (let key in value) {
            prefixed[prefix + key] = value[key]
        }

        return prefixed
    } else {
        return prefix + value
    }
})

Vue.filter('slugify', (value) => {
    return value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
})

Vue.filter('middleEllipsis', (value, totalCharacters) => {
    if (totalCharacters && value.length > totalCharacters){
        return value.substring(0, totalCharacters - 11) + '...' + value.substring(value.length - 10, value.length)
    }
    return value
})

Vue.directive('focus', {
    inserted: (el) => {
        el.focus()
        if (el === document.activeElement)
            el.focusDone = true
    },
    update: (el) => {
        if (!el.focusDone) {
            el.focus()
            if (el === document.activeElement)
                el.focusDone = true
        }
    },
})

Vue.directive('click-outside', {
    bind (el, binding, vnode) {
        el.event = (event) => {
            if (!(el === event.target || el.contains(event.target))) {
                vnode.context[binding.expression](event)
            }
        }
        document.body.addEventListener('click', el.event)
    },
    unbind (el) {
        document.body.removeEventListener('click', el.event)
    },
})
