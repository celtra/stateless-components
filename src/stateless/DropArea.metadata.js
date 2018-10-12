export default {
    name: 'DropArea',
    hasAbsolutePosition: true,
    variations: {
        theme: ['dark', 'light'],
        size: ['condensed', 'normal', 'phat'],
    },
    usecases: [
        {
            dragActive: true,
        },
    ],
    data () {
        return {
            width: null,
            height: null,
        }
    },
}
