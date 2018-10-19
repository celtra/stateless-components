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
    usecases: [
        {
            slot: defaultSlot,
            value: 'something',
        },
    ],
}
