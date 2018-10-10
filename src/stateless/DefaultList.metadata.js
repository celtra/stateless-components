import { defaultNestedItems } from './demo_data'

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
            items: defaultNestedItems,
            initialOffset: 50,
        },
        {
            items: defaultNestedItems,
            value: '12',
        },
    ],
}
