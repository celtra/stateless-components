const setup = () => {
    // Wait for tooltip animation to finish
    return new Promise(resolve => setTimeout(resolve, 1200))
}

const defaultSlot = (h) => {
    return 'Something'
}

export default {
    name: 'Tooltip',
    hasAbsolutePosition: true,
    variations: {
        theme: ['dark', 'light'],
    },
    usecases: [
        {
            setup: setup,
            slot: defaultSlot,
            title: 'Some',
            show: true,
        },
    ],
}
