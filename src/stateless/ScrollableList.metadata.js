import { largeItems } from './demo_data'

export default {
    metaName: 'ScrollableList',
    variations: {
        theme: ['dark', 'light'],
        size: ['condensed', 'normal', 'phat'],
    },
    usecases: [
        {
            items: largeItems,
            numItems: 10,
            label: 'Something',
            showOverlay: true,
        },
    ],
}
