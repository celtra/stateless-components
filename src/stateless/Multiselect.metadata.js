import { defaultItems } from './demo_data'

export default {
    metaName: 'Multiselect',
    variations: {
        theme: ['dark', 'light'],
        size: ['condensed', 'normal', 'phat'],
        isSearchable: [false, true],
        canSelectAndClearAll: [false, true],
    },
    usecases: [
        {
            options: defaultItems,
            value: ['1', '2'],
        },
    ],
}
