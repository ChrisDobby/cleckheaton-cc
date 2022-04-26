import { useLoaderData, MetaFunction } from 'remix';
import { getClient } from '~/sanity/getClient';
import FixtureList from '~/components/fixtureList';
import { Fixture } from '~/types';
import fixtureListStyles from '~/components/fixtureList.css';
import matchBallSponsorStyles from '~/components/matchballSponsor';

export const meta: MetaFunction = () => ({
  title: 'Fixtures',
  description: 'Cleckheaton Cricket Club fixtures for this season',
});

export async function loader() {
  const fixtures = await getClient().fetch(
    `*[_type == "fixture"]{ _id, matchDate, opposition, team, venue, "hasPreview": defined(preview), result, "hasReport": defined(report), scorecard, matchballSponsor, matchballSponsorUrl, competition->{name} }`
  );

  return {
    fixtures,
  };
}

export const links = () => [
  { rel: 'stylesheet', href: fixtureListStyles },
  { rel: 'stylesheet', href: matchBallSponsorStyles },
];

export default function Index() {
  const { fixtures } = useLoaderData() as { fixtures: Fixture[] };
  return (
    <div className='fixture-list-grid'>
      <FixtureList
        header='1ST TEAM FIXTURES'
        fixtures={fixtures.filter(({ team }) => team === '1st')}
      />
      <FixtureList
        header='2ND TEAM FIXTURES'
        fixtures={fixtures.filter(({ team }) => team === '2nd')}
      />
    </div>
  );
}
