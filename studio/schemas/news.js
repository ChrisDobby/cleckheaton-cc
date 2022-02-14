import { format } from 'date-fns';

export default {
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      initialValue: format(new Date(), 'yyyy-MM-dd'),
      validation: (Rule) => Rule.required(),
      options: {
        dateFormat: 'DD-MMMM-YYYY',
      },
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Sub-Title',
      type: 'string',
    },
    {
      name: 'showOnHomepage',
      title: 'Show on Homepage',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
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
  ],
  orderings: [
    {
      title: 'Date',
      name: 'date',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      date: 'date',
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare: (selection) => {
      return {
        title: `${format(new Date(selection.date), 'dd-MMM-yyyy')} - ${
          selection.title
        }`,
        subtitle: selection.subtitle,
      };
    },
  },
};
