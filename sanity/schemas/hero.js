export default{
    name: 'hero',
    title: 'Hero',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name:'body',
            title: 'Body',
            type: 'blockContent'
        }
    ]
}