export default{
    name: 'technologies',
    title: 'Technologies',
    type: 'document',
    fields: [
        {
            name:'name',
            title:'Name',
            type:'string'
        },
        {
            name:'icon',
            title:'Icon',
            type:'image',
            options:{
                hotspot:true
            }
        }
    ]
}