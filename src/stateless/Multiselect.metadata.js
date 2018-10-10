import { defaultItems } from './demo_data'

export default {
    name: 'Multiselect',
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
