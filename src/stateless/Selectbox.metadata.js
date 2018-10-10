import { defaultItems } from './demo_data'

export default {
    name: 'Selectbox',
    variations: {
        theme: ['dark', 'light'],
        size: ['condensed', 'normal', 'phat'],
        disabled: [false, true],
    },
    usecases: [
        {
            options: defaultItems,
            isSearchable: true,
            isUnselectable: true,
            label: 'Something',
        },
    ],
}
