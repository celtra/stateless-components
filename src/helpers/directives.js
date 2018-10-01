export const focus = {
    inserted: (el) => {
        el.focus()
        if (el === document.activeElement)
        {el.focusDone = true}
    },
    update: (el) => {
        if (!el.focusDone) {
            el.focus()
            if (el === document.activeElement)
            {el.focusDone = true}
        }
    },
}

export const clickOutside = {
    bind (el, binding, vnode) {
        el.event = (event) => {
            if (!(el === event.target || el.contains(event.target))) {
                vnode.context[binding.expression](event)
            }
        }
        document.addEventListener('click', el.event)
    },
    unbind (el) {
        document.removeEventListener('click', el.event)
    },
}
