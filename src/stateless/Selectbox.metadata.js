import { defaultItems } from './demo_data'

export default {
    metaName: 'Selectbox',
    variations: {
        theme: ['dark', 'light'],
        size: ['condensed', 'normal', 'phat'],
        disabled: [false, true],
    },
    usecases: [
        {
            name: 'Basic',
            options: defaultItems,
            isSearchable: true,
            isUnselectable: true,
            label: 'Something',
        },
        {
            name: 'Open',
            options: defaultItems,
            isSearchable: true,
            isUnselectable: true,
            label: 'Something',
            setup (vm) {
                vm.openSelectList()
            },
            disabled: false,
        },
    ],
}
