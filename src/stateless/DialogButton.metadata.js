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
            name: 'Success',
            slot: defaultSlot,
        },
        {
            name: 'Warning',
            slot: defaultSlot,
            warning: true,
        },
        {
            name: 'Error',
            slot: defaultSlot,
            error: true,
        },
    ],
}
