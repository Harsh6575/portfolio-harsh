export default{
    name: 'certificates',
    title: 'Certificates',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name:'description',
            title: 'Description',
            type: 'blockContent'
        },
        {
            name:'link',
            title: 'Link',
            type: 'url'
        },
        {
            name: 'from',
            title: 'From',
            type: 'string'
        },
        {
            name:'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true
            }
        }
    ]
}