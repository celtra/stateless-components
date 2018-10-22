import Icon from './icon.vue'

export default {
    metaName: 'Input',
    variations: {
        theme: ['dark', 'light'],
        size: ['condensed', 'normal', 'phat'],
        disabled: [false, true],
    },
    usecases: [
        {
            name: 'Inactive',
            label: 'Something',
        },
        {
            testOnly: true,
            name: 'Focused',
            label: 'Something',
            setup (vm) {
                vm.focused = true
                vm.overlay.open = true
                return new Promise(resolve => setTimeout(resolve, 500))
            },
        },
        {
            name: 'Input',
            label: 'Something',
            setup (vm) {
                vm.text = 'Input text'
                return new Promise(resolve => setTimeout(resolve, 500))
            },
        },
        {
            name: 'Password hidden',
            type: 'password',
            setup (vm) {
                vm.text = 'Hidden text'
            },
        },
        {
            testOnly: true,
            name: 'Before slot',
            scopedSlots: {
                before (h) {
                    return h(Icon, { props: { name: 'bars' } })
                    return h('div', { style: { backgroundColor: 'red', width: '100%', height: '100%', display: 'flex' } }, 'S')
                },
            },
        },
        {
            name: 'Left slot',
            scopedSlots: {
                left (h) {
                    return h(Icon, { props: { name: 'pencil-edit' } })
                },
            },
        },
        {
            name: 'Right slot',
            scopedSlots: {
                right (h) {
                    return h(Icon, { props: { name: 'clear' } })
                },
            },
        },
    ],
}
