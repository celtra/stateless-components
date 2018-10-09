const setup = () => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 1000)
    })
}

export default {
    name: 'Toast',
    hasAbsolutePosition: true,
    variations: {
        theme: ['dark', 'light'],
    },
    usecases: [
        {
            setup: setup,
            label: 'Label',
        },
        {
            setup: setup,
            label: 'Label',
            actionLabel: 'Action',
        },
    ],
}
