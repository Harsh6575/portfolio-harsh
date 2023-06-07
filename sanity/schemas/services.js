export default {
    name: 'services',
    title: 'Services',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'icon',
            title: 'Icon',
            type: 'image',
            options: {
                hotspot: true,
            }
        },
        {
            name: 'iconbg',
            title: 'Icon Background',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
    ]
}