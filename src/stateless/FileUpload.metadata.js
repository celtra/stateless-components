export default {
    metaName: 'FileUpload',
    variations: {
        theme: ['dark', 'light'],
        disabled: [false, true],
    },
    usecases: [
        {
            file: {},
            uploadUrl: 'https://example.com',
        },
    ],
}
