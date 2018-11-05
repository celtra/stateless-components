function setup () {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 1000)
    })
}

export default {
    metaName: 'Toast',
    hasAbsolutePosition: true,
    variations: {
        theme: ['dark', 'light'],
    },
    usecases: [
        {
            name: 'Basic',
            setup: setup,
            label: 'Label',
        },
        {
            name: 'With action',
            setup: setup,
            label: 'Label',
            actionLabel: 'Action',
        },
    ],
}
