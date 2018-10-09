function defaultSlot (h) {
    return h('div', 'Something')
}

export default {
    name: 'Group',
    variations: {
        theme: ['dark', 'light'],
    },
    usecases: [
        {
            slot: defaultSlot,
            label: 'Modeling',
        },
        {
            slot: defaultSlot,
            label: 'Modeling',
            description: 'Loooooooong descriptiooooooooon',
        },
    ],
}
