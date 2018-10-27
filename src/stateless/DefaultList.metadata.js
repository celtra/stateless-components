import { defaultNestedItems, defaultSimpleItems } from './demo_data'

function multilineSlot (h) {
    return ({ item }) => {
        return h('div', [
            h('div', item.label),
            h('div', item.metadata),
        ])
    }
}

export default {
    name: 'DefaultList',
    variations: {
        theme: ['dark', 'light'],
        size: ['condensed', 'normal', 'phat'],
    },
    usecases: [
        {
            items: defaultNestedItems,
        },
        {
            scopedSlots: { default: multilineSlot },
            items: defaultSimpleItems,
            transitionSorting: true,
            initialOffset: 50,
        },
        {
            items: defaultNestedItems,
            value: '12',
        },
    ],
}
