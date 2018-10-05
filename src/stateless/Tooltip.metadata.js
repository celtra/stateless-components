export default {
    name: 'Tooltip',
    hasAbsolutePosition: true,
    setup () {
        // Wait for tooltip animation to finish
        return new Promise(resolve => setTimeout(resolve, 1200))
    },
    slot (h) {
        return 'Something'
    },
    variations: {
        theme: ['dark', 'light'],
    },
    usecases: [
        {
            title: 'Some',
            show: true,
        },
    ],
}
