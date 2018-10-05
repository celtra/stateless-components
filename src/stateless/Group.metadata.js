export default {
    name: 'Group',
    slot (h) {
        return h('div', 'Something')
    },
    variations: {
        theme: ['dark', 'light'],
    },
    usecases: [
        {
            label: 'Modeling',
        },
        {
            label: 'Modeling',
            description: 'Loooooooong descriptiooooooooon',
        },
    ],
}
