export default {
    name: 'Calendar',
    variations: {
        theme: ['dark', 'light'],
    },
    usecases: [
        {
            value: new Date(2018, 0, 10),
            isRange: false,
        },
        {
            value: { from: new Date(2018, 0, 10) },
            isRange: true,
        },
        {
            value: { from: new Date(2018, 0, 10), to: new Date(2018, 1, 10) },
            isRange: true,
        },
    ],
}
