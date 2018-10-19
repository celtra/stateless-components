function defaultSlot (h) {
    return h('div', 'Something')
}

export default {
    metaName: 'Checkbox',
    variations: {
        theme: ['dark', 'light', 'white'],
        size: ['condensed', 'normal', 'phat'],
        value: [true, false, null],
        disabled: [false, true],
    },
    usecases: [
        {
            name: 'Basic',
            slot: defaultSlot,
        },
        {
            name: 'Toggle',
            slot: defaultSlot,
            isToggle: true,
        },
    ],
}
