import { redirect, useLoaderData } from 'remix';
import { getClient } from '~/sanity/getClient';
import Sponsors from '~/components/sponsors';
import Matchday from '~/components/matchday';
import { Sponsor, Fixture, MatchDay } from '~/types';
import { sortSponsors, sortFixtures } from '~/sort';
import { transformMatchDay } from '~/transform';
import { getMatchDates, isMatchDay } from '~/matchDays';

import sponsorsStyles from '~/components/sponsors.css';
import matchdayStyles from '~/components/matchday.css';
import matchballSponsorStyles from '~/components/matchballSponsor.css';
import teamListStyles from '~/components/teamList.css';
import carouselStyles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import playerSponsorStyles from '~/components/playerSponsor.css';

export const links = () => [
  { rel: 'stylesheet', href: sponsorsStyles },
  { rel: 'stylesheet', href: matchdayStyles },
  { rel: 'stylesheet', href: matchballSponsorStyles },
  { rel: 'stylesheet', href: teamListStyles },
  { rel: 'stylesheet', href: carouselStyles },
  { rel: 'stylesheet', href: playerSponsorStyles },
];

const getScorecardObjectName = (fixture: Fixture) => {
  const date = new Date(fixture.matchDate);
  date.setHours(0, 0, 0, 0);

  return `${date.getTime()}-${fixture.team === '1st' ? 'first' : 'second'}-team.json`;
};

const getLiveScorecardForFixture = async (fixture: Fixture) => {
  const scorecardResponse = await fetch(`https://cleckheaton-cc-live-scorecards.s3.eu-west-2.amazonaws.com/${getScorecardObjectName(fixture)}`);
  return { fixtureId: fixture._id, liveScorecard: scorecardResponse.ok ? await scorecardResponse.json() : null };
};

const addLiveScorecardsToFixtures = async (fixtures: Fixture[]) => {
  const liveFixtures = fixtures.filter(({ result }) => !Boolean(result));
  const liveScorecards = await Promise.all(liveFixtures.map(getLiveScorecardForFixture));
  return fixtures.map(fixture => {
    const fixtureScorecard = liveScorecards.find(({ fixtureId }) => fixtureId === fixture._id);
    return fixtureScorecard ? { ...fixture, liveScorecard: fixtureScorecard.liveScorecard } : fixture;
  });
};

export async function loader() {
  const today = new Date();

  if (!isMatchDay(today)) {
    return redirect('/');
  }

  const [fromMatchDate, toMatchDate] = getMatchDates(today);
  const [fixtures, sponsors] = (await Promise.all([
    getClient().fetch(
      `*[_type == "fixture" && matchDate >= "${fromMatchDate}" && matchDate <= "${toMatchDate}"]{ _id, matchDate, opposition, team, venue, "hasPreview": defined(preview), "hasReport": defined(report), result, scorecard, matchballSponsor, matchballSponsorUrl, teamSelection[]->{_id,name,sponsor,sponsorUrl,"sponsorImageUrl":sponsorImage.asset->url}, competition->{name} }`,
    ),
    getClient().fetch(`*[_type == "sponsor"]{ _id, title, url, position, "imageUrl":image.asset->url }`),
  ])) as [Fixture[], Sponsor[]];

  const fixturesWithLiveScorecards = await addLiveScorecardsToFixtures(fixtures);
  console.log(fixturesWithLiveScorecards);
  return {
    matchDay: transformMatchDay(fixtures.sort(sortFixtures), today),
    sponsors: sponsors.sort(sortSponsors),
  };
}

export default function Index() {
  const {
    sponsors,
    matchDay: { todaysFixtures, tomorrowsFixtures, yesterdaysFixtures },
  } = useLoaderData<{ sponsors: Sponsor[]; matchDay: MatchDay }>();

  return (
    <>
      <Sponsors sponsors={sponsors} />
      <Matchday day="TODAY" fixtures={todaysFixtures} />
      <Matchday day="YESTERDAY" fixtures={yesterdaysFixtures} />
      <Matchday day="TOMORROW" fixtures={tomorrowsFixtures} />
    </>
  );
}
