export default {
    metaName: 'Input',
    variations: {
        theme: ['dark', 'light'],
        size: ['condensed', 'normal', 'phat'],
        disabled: [false, true],
    },
    usecases: [
        {
            label: 'Something',
        },
        {
            label: 'Something',
            setup (vm) {
                vm.focused = true
                vm.overlay.open = true
                return new Promise(resolve => setTimeout(resolve, 500))
            },
        },
        {
            label: 'Something',
            setup (vm) {
                vm.text = 'Input text'
                return new Promise(resolve => setTimeout(resolve, 500))
            },
        },
        {
            type: 'password',
            setup (vm) {
                vm.text = 'Hidden text'
            },
        },
        {
            scopedSlots: {
                before (h) {
                    return h('span', 'px')
                },
            },
        },
        {
            scopedSlots: {
                left (h) {
                    return h('span', 'px')
                },
            },
        },
        {
            scopedSlots: {
                right (h) {
                    return h('span', 'px')
                },
            },
        },
    ],
}
