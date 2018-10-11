function setup () {
    this.show()
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 1000)
    })
}

function slot (h) {
    return h('div', 'Label')
}

function actionSlot (h) {
    return () => h('div', 'Action')
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
            slot: slot,
        },
        {
            setup: setup,
            slot: slot,
            scopedSlots: {
                action: actionSlot,
            },
        },
    ],
}
