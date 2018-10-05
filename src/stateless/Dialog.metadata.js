export default {
    name: 'Dialog',
    hasAbsolutePosition: true,
    setup () {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 1000)
        })
    },
    slot (h) {
        const style = { textAlign: 'center', color: this.theme === 'dark' ? 'white' : 'black' }
        return h('div', { style }, 'Dialog content goes here')
    },
    variations: {
        theme: ['dark', 'light'],
        hasBackButton: [true, false],
        hasCloseButton: [true, false],
        stepId: ['a', null],
    },
    usecases: [
        {
            steps: [
                { id: 'a', passiveLabel: 'A', activeLabel: 'A' },
                { id: 'b', passiveLabel: 'B', activeLabel: 'B' },
            ],
        },
    ],
}
