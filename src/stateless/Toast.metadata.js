export default {
    name: 'Toast',
    hasAbsolutePosition: true,
    setup () {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 1000)
        })
    },
    variations: {
        theme: ['dark', 'light'],
    },
    usecases: [
        {
            label: 'Label',
        },
        {
            label: 'Label',
            actionLabel: 'Action',
        },
    ],
}
