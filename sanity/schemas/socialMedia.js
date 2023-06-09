export default {
    name: 'socialMedia',
    title: 'Social Media',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'url',
            title: 'URL',
            type: 'url',
        },
        {
            name: 'icon',
            title: 'Icon',
            type: 'image',
            options: {
                hotspot: true,
            }
        }
    ]
}