import { format } from 'date-fns';

export default {
  name: 'fixture',
  title: 'Fixture',
  type: 'document',
  fields: [
    {
      name: 'matchDate',
      title: 'Match Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      options: {
        dateFormat: 'DD-MMMM-YYYY',
      },
    },
    {
      name: 'team',
      title: 'Team',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: { list: ['1st', '2nd'], layout: 'radio' },
    },
    {
      name: 'competition',
      title: 'Competition',
      type: 'reference',
      to: [{ type: 'competition' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'venue',
      title: 'Venue',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: { list: ['Home', 'Away'], layout: 'radio' },
    },
    {
      name: 'opposition',
      title: 'Opposition',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'preview',
      title: 'Preview',
      type: 'blockContent',
    },
    {
      name: 'result',
      title: 'Result',
      type: 'string',
    },
    {
      name: 'report',
      title: 'Report',
      type: 'blockContent',
    },
    {
      name: 'scorecard',
      title: 'Scorecard',
      type: 'url',
    },
    {
      name: 'matchballSponsor',
      title: 'Matchball Sponsor',
      type: 'string',
    },
    {
      name: 'matchballSponsorUrl',
      title: 'Matchball Sponsor Url',
      type: 'url',
    },
    {
      name: 'teamSelection',
      title: 'Team Selection',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'player' }] }],
      validation: (Rule) => Rule.unique(),
    },
  ],
  orderings: [
    {
      title: 'Match Date',
      name: 'matchDate',
      by: [{ field: 'matchDate', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      matchDate: 'matchDate',
      team: 'team',
      opposition: 'opposition',
      venue: 'venue',
    },
    prepare: (selection) => {
      const subtitle =
        selection.venue === 'Home'
          ? `${selection.team || ''} v ${selection.opposition || ''}`
          : `${selection.opposition || ''} v ${selection.team || ''}`;
      return {
        title: format(new Date(selection.matchDate), 'dd-MMM-yyyy (HH:mm)'),
        subtitle,
      };
    },
  },
};
