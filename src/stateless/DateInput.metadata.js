export default {
    name: 'DateInput',
    variations: {
        theme: ['dark', 'light'],
        size: ['condensed', 'normal', 'phat'],
    },
    usecases: [
        {
            label: 'Enter date',
            value: new Date(2018, 0, 10),
        },
    ],
}
