function defaultSlot (h) {
    return h('div', 'Something')
}

export default {
    metaName: 'Group',
    variations: {
        theme: ['dark', 'light'],
    },
    usecases: [
        {
            scopedSlots: { default: defaultSlot },
            label: 'Modeling',
        },
        {
            scopedSlots: { default: defaultSlot },
            label: 'Modeling',
            description: 'Loooooooong descriptiooooooooon',
        },
    ],
}
