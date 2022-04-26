export default {
  name: 'player',
  title: 'Players',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
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
    },
    {
      name: 'sponsor',
      title: 'Sponsor',
      type: 'string',
    },
    {
      name: 'sponsorUrl',
      title: 'Sponsor Url',
      type: 'url',
    },
    {
      name: 'sponsorImage',
      title: 'Sponsor Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
  orderings: [
    {
      title: 'Name',
      name: 'name',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
  preview: { select: { title: 'name' } },
};
