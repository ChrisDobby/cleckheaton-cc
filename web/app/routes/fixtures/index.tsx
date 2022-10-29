import { useLoaderData, MetaFunction } from 'remix';
import { getMonth, getDate, getYear } from 'date-fns';
import { getClient } from '~/sanity/getClient';
import FixtureList from '~/components/fixtureList';
import { Fixture } from '~/types';
import fixtureListStyles from '~/components/fixtureList.css';
import matchBallSponsorStyles from '~/components/matchballSponsor';
import FixturesHeader from '~/components/fixturesHeader';

export const meta: MetaFunction = () => ({
  title: 'Fixtures',
  description: 'Cleckheaton Cricket Club fixtures for this season',
});

export async function loader() {
  const now = new Date();
  const season = getMonth(now) < 9 || getDate(now) < 15 ? getYear(now) : getYear(now) + 1;
  const fixtures = await getClient().fetch(
    `*[_type == "fixture" && matchDate >= "${season}-01-01"]{ _id, matchDate, opposition, team, venue, "hasPreview": defined(preview), result, "hasReport": defined(report), scorecard, matchballSponsor, matchballSponsorUrl, competition->{name} }`,
  );

  return {
    fixtures,
    season,
  };
}

export const links = () => [
  { rel: 'stylesheet', href: fixtureListStyles },
  { rel: 'stylesheet', href: matchBallSponsorStyles },
];

export default function Index() {
  const { fixtures, season } = useLoaderData<{ fixtures: Fixture[]; season: string }>();
  return (
    <>
      <FixturesHeader season={season} fixtureCount={fixtures.length} />
      {fixtures.length > 0 && (
        <div className="fixture-list-grid">
          <FixtureList header="1ST TEAM FIXTURES" fixtures={fixtures.filter(({ team }) => team === '1st')} />
          <FixtureList header="2ND TEAM FIXTURES" fixtures={fixtures.filter(({ team }) => team === '2nd')} />
        </div>
      )}
    </>
  );
}
