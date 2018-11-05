import { defaultItems, defaultSimpleItems } from './demo_data'

export default {
    metaName: 'Multiselect',
    variations: {
        theme: ['dark', 'light'],
        size: ['condensed', 'normal', 'phat'],
    },
    usecases: [
        {
            name: 'Basic',
            options: defaultSimpleItems,
            value: ['1', '2'],
        },
        {
            name: 'Can clear all',
            canClearAll: true,
            options: defaultSimpleItems,
        },
        {
            name: 'Can clear and select all',
            canSelectAndClearAll: true,
            options: defaultSimpleItems,
        },
        {
            name: 'Searchable',
            isSearchable: true,
            options: defaultItems,
        },
    ],
}
