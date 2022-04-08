import { format } from 'date-fns';

export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'eventDate',
      title: 'Event Date',
      type: 'date',
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
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      // validation: (Rule) => Rule.required(),
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
      title: 'Event Date',
      name: 'eventDate',
      by: [{ field: 'eventDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      eventDate: 'eventDate',
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare: (selection) => {
      return {
        title: `${format(
          new Date(selection.eventDate),
          'dd-MMM-yyyy (HH:mm)'
        )} - ${selection.title}`,
        subtitle: selection.subtitle,
      };
    },
  },
};
