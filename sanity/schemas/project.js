// schemas/project.js

export default {
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'tags',
        title: 'Tags',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [{ type: 'tag' }],
          },
        ],
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
      },
      {
        name: 'source_code_link',
        title: 'Source Code Link',
        type: 'url',
      },
      {
        name: 'live_demo_link',
        title: 'Live Demo Link',
        type: 'url',
      }
    ],
  };