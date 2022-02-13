export default {
  name: 'competition',
  title: 'Competition',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: { select: { title: 'name' } },
};
