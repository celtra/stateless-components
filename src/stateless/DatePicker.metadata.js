export default {
    metaName: 'DatePicker',
    variations: {
        theme: ['dark', 'light'],
        size: ['condensed', 'normal', 'phat'],
        disabled: [false, true],
    },
    usecases: [
        {
            label: 'Enter date',
            value: new Date(2018, 0, 10),
        },
        {
            label: 'Enter date',
            value: new Date(2018, 0, 10),
            error: 'Something went wrong',
        },
    ],
}
