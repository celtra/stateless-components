export default {
    name: 'Checkbox',
    slot (h) {
        return h('div', 'Something')
    },
    variations: {
        theme: ['dark', 'light', 'white'],
        size: ['condensed', 'normal', 'phat'],
        value: [true, false],
        disabled: [false, true],
    },
    usecases: [
        {},
        {
            isToggle: true,
        },
    ],
}
