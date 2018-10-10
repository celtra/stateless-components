export default {
    name: 'DropArea',
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
