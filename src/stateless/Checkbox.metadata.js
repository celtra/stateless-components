const defaultSlot = (h) => {
    return h('div', 'Something')
}

export default {
    name: 'Checkbox',
    variations: {
        theme: ['dark', 'light', 'white'],
        size: ['condensed', 'normal', 'phat'],
        value: [true, false],
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
