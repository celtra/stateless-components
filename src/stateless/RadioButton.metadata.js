export default {
    name: 'RadioButton',
    slot (h) {
        return 'Something'
    },
    variations: {
        theme: ['dark', 'light'],
        size: ['condensed', 'normal', 'phat'],
        disabled: [false, true],
        selectedValue: ['none', 'something'],
    },
    usecases: [
        {
            value: 'something',
        },
    ],
}
