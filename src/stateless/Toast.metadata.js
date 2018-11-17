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
    metaName: 'Toast',
    hasAbsolutePosition: true,
    variations: {
        theme: ['dark', 'light'],
    },
    usecases: [
        {
            name: 'Basic',
            setup: setup,
            slot: slot,
        },
        {
            name: 'With action',
            setup: setup,
            slot: slot,
            scopedSlots: {
                action: actionSlot,
            },
        },
    ],
}
