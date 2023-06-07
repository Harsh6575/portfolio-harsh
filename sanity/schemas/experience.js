export default{
    name: 'experience',
    title: 'Experience',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'company',
            title: 'Company',
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
            name: 'url',
            title: 'URL',
            type: 'url',
        },
        {
            name: 'location',
            title: 'Location',
            type: 'string',
        },
        {
            name: 'position',
            title: 'Position',
            type: 'string',
        },
        {
            name: 'startDate',
            title: 'Start Date',
            type: 'date',
        },
        {
            name: 'endDate',
            title: 'End Date',
            type: 'date',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name:'points',
            title: 'Points',
            type: 'array',
            of: [{type: 'string'}]
        }
    ]
}