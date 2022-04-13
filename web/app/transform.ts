import { format } from 'date-fns';
import { Fixture, MatchResult } from './types';

export const transformLatestResult = (fixture: Fixture): MatchResult => {
  const descriptionPrefix =
    fixture.venue === 'Home' ? '' : `${fixture.opposition} v `;
  const descriptionSuffix =
    fixture.venue === 'Home' ? ` v ${fixture.opposition}` : '';
  return {
    _id: fixture._id,
    date: format(new Date(fixture.matchDate), 'dd-MMM'),
    description: `${descriptionPrefix}${fixture.team} team${descriptionSuffix}`,
    result: fixture.result as string,
    report: fixture.report,
  };
};
