function defaultSlot (h) {
    return 'Something'
}

export default {
    metaName: 'RadioButton',
    variations: {
        theme: ['dark', 'light'],
        size: ['condensed', 'normal', 'phat'],
        disabled: [false, true],
        selectedValue: ['none', 'something'],
    },
    shareModelValue: true,
    usecases: [
        {
            slot: defaultSlot,
            value: 'something',
        },
        {
            slot: defaultSlot,
            value: 'something else',
        },
    ],
}
