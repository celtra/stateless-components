export default {
    name: 'DialogButton',
    slot (h) {
        return 'Something'
    },
    variations: {
        disabled: [false, true],
        // loading: [false, true], We would have to disable animation to test this
        error: [false, true],
        warning: [false, true],
    },
    usecases: [
        {},
    ],
}
