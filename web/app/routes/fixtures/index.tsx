import { useLoaderData } from 'remix';
import { getClient } from '~/sanity/getClient';
import FixtureList from '~/components/fixtureList';
import { Fixture } from '~/types';
import fixtureListStyles from '~/components/fixtureList.css';

export async function loader() {
  const fixtures = await getClient().fetch(
    `*[_type == "fixture"][0...4]{ _id, matchDate, opposition, team, venue, preview, result, competition->{name} }`
  );

  return {
    fixtures,
  };
}

export const links = () => [{ rel: 'stylesheet', href: fixtureListStyles }];

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
