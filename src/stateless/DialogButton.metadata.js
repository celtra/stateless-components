function defaultSlot (h) {
    return h('div', 'Something')
}

export default {
    metaName: 'DialogButton',
    variations: {
        disabled: [false, true],
        // loading: [false, true], We would have to disable animation to test this
    },
    usecases: [
        {
            slot: defaultSlot,
        },
        {
            slot: defaultSlot,
            warning: true,
        },
        {
            slot: defaultSlot,
            error: true,
        },
    ],
}
