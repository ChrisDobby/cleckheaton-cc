import { format } from 'date-fns';
import { isAfter, isBefore, isSameDay } from 'date-fns';
import {
  DetailedFixture,
  Fixture,
  MatchDay,
  MatchPreview,
  MatchReport,
  MatchResult,
} from './types';

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
  hasReport: fixture.hasReport,
  scorecard: fixture.scorecard,
});

export const transformReport = (fixture: DetailedFixture): MatchReport => ({
  _id: fixture._id,
  ...getFixtureFields(fixture),
  result: fixture.result as string,
  report: fixture.report,
  scorecard: fixture.scorecard,
});

export const transformPreview = (fixture: DetailedFixture): MatchPreview => ({
  ...getFixtureFields(fixture),
  preview: fixture.preview,
});

export const transformMatchDay = (fixtures: Fixture[], today: Date): MatchDay =>
  fixtures.reduce(
    (matchDay, fixture) => {
      const matchDate = new Date(fixture.matchDate);
      switch (true) {
        case isSameDay(today, matchDate):
          return {
            ...matchDay,
            todaysFixtures: [...(matchDay.todaysFixtures || []), fixture],
          };
        case isAfter(today, matchDate):
          return {
            ...matchDay,
            yesterdaysFixtures: [
              ...(matchDay.yesterdaysFixtures || []),
              fixture,
            ],
          };
        case isBefore(today, matchDate):
          return {
            ...matchDay,
            tomorrowsFixtures: [...(matchDay.tomorrowsFixtures || []), fixture],
          };
      }

      return matchDay;
    },
    {
      todaysFixtures: [] as Fixture[],
      tomorrowsFixtures: [] as Fixture[],
      yesterdaysFixtures: [] as Fixture[],
    }
  );
