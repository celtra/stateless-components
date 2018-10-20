export default {
    metaName: 'Calendar',
    usecases: [
        {
            name: 'Single day',
            value: new Date(2018, 0, 10),
            isRange: false,
        },
        {
            name: 'Date range',
            value: { from: new Date(2018, 0, 10) },
            isRange: true,
        },
        {
            name: 'Date range (selected)',
            value: { from: new Date(2018, 0, 10), to: new Date(2018, 1, 10) },
            isRange: true,
        },
    ],
}
