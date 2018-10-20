const baseProps = {
    min: 1,
    max: 100,
    limit: 20,
    step: 1,
    label: 'Basic slider',
    value: 5,
    unit: '%',
}

export default {
    metaName: 'Slider',
    variations: {
        theme: ['dark', 'light'],
        size: ['condensed', 'normal', 'phat'],
        disabled: [false, true],
    },
    usecases: [
        {
            name: 'Left align',
            ...baseProps,
            alignment: 'left',
        },
        {
            name: 'Right align',
            ...baseProps,
            alignment: 'right',
        },
    ],
}
