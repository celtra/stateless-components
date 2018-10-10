export default {
    name: 'Typeahead',
    usecases: [
        {
            label: 'Something',
            value: 'Lorem',
            getSuggestions: () => [
                { id: '1', label: "Something", metadata: 'zan.kusterle@gmail.com', icon: 'plus' },
                { id: '2', label: "Lorem" },
                { id: '3', label: "Ipsum", metadata: 'someone@lorem.ipsum' },
            ],
        },
    ],
}
