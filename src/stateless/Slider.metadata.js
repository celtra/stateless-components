export default {
    name: 'Slider',
    variations: {
        theme: ['dark', 'light'],
        size: ['condensed', 'normal', 'phat'],
    },
    usecases: [
        {
            min: 1,
            max: 100,
            limit: 20,
            step: 1,
            label: 'Basic slider',
            valueArray: [5,10],
            unit: '%',
            alignment: 'right',
        },
    ],
}
