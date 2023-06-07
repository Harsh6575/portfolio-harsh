export default {
    name: 'socialMedia',
    title: 'Social Media',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Social Media Name',
            type: 'string',
        },
        {
            name: 'url',
            title: 'Social Media URL',
            type: 'url',
        },
        {
            name: 'icon',
            title: 'Social Media Icon',
            type: 'image',
            options: {
                hotspot: true,
            }
        }
    ]
}