export default {
    name: 'FileUploadRequirements',
    hasAbsolutePosition: true,
    usecases: [
        {
            requirements: [
                { name: 'Format', value: 'PNG, JPG' },
                { name: 'Size', value: 'max. 3MB' },
            ],
        },
    ],
}
