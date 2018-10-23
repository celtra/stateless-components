function defaultSlot (h) {
    return h('div', 'Something')
}

export default {
    metaName: 'Checkbox',
    variations: {
        theme: ['dark', 'white'], // TODO: Removed light for demo
        size: ['condensed', 'normal', 'phat'],
        value: [true, false, null],
        disabled: [false, true],
    },
    usecases: [
        {
            name: 'Basic',
            scopedSlots: { default: defaultSlot },
        },
        {
            name: 'Toggle',
            scopedSlots: { default: defaultSlot },
            isToggle: true,
        },
    ],
}
