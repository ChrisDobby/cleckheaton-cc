import { format } from 'date-fns';
import { Fixture, MatchPreview, MatchResult } from './types';

const getFixtureFields = (fixture: Fixture) => {
  const descriptionPrefix =
    fixture.venue === 'Home' ? '' : `${fixture.opposition} v `;
  const descriptionSuffix =
    fixture.venue === 'Home' ? ` v ${fixture.opposition}` : '';

  return {
    date: format(new Date(fixture.matchDate), 'dd-MMM'),
    description: `${descriptionPrefix}${fixture.team} team${descriptionSuffix}`,
  };
};

export const transformLatestResult = (fixture: Fixture): MatchResult => ({
  _id: fixture._id,
  ...getFixtureFields(fixture),
  result: fixture.result as string,
  report: fixture.report,
  scorecard: fixture.scorecard,
});

export const transformPreview = (fixture: Fixture): MatchPreview => ({
  ...getFixtureFields(fixture),
  preview: fixture.preview,
});
