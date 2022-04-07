export default {
  name: 'sponsor',
  title: 'Sponsors',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'url',
      title: 'url',
      type: 'url',
    },
    {
      name: 'position',
      title: 'Position',
      type: 'number',
    },
  ],
  orderings: [
    {
      title: 'Position',
      name: 'position',
      by: [{ field: 'position', direction: 'asc' }],
    },
  ],
  preview: { select: { title: 'title' } },
};
