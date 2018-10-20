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
    forceValueSync: true,
    usecases: [
        {
            name: 'Value A',
            slot: () => 'Something',
            value: 'something',
        },
        {
            name: 'Value B',
            slot: () => 'Something else',
            value: 'something else',
        },
    ],
}
