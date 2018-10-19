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
            slot: defaultSlot,
        },
        {
            slot: defaultSlot,
            isToggle: true,
        },
    ],
}
