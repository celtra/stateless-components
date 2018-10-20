export default {
    metaName: 'FileUpload',
    variations: {
        theme: ['dark', 'light'],
        disabled: [false, true],
    },
    usecases: [
        {
            name: 'Basic',
            file: {},
            uploadUrl: 'https://example.com',
        },
    ],
}
