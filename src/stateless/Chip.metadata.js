export default {
    metaName: 'Chip',
    variations: {
        theme: ['dark', 'light'],
        isActive: [false, true],
        isRemovable: [false, true],
        isDisabled: [false, true],
    },
    usecases: [
        {
            name: 'Basic',
            label: 'Label',
        },
        {
            name: 'With metadata',
            label: 'Label',
            metadata: '3/9',
        },
    ],
}
