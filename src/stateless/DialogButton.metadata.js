const defaultSlot = (h) => {
    return h('div', 'Something')
}

export default {
    name: 'DialogButton',
    variations: {
        disabled: [false, true],
        // loading: [false, true], We would have to disable animation to test this
        error: [false, true],
        warning: [false, true],
    },
    usecases: [
        {
            slot: defaultSlot,
        },
    ],
}
