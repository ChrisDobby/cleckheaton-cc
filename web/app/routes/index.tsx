import { useLoaderData } from 'remix';
import { getClient } from '~/sanity/getClient';
import Header from '../components/header';
import UpcomingFixtures from '../components/upcomingFixtures';

import headerStyles from '../components/header.css';
import upcomingFixtureStyles from '../components/upcomingFixtures.css';
import indexStyles from '../styles/index.css';
import { Fixture } from '~/types';

const sortFixtures = (f1: Fixture, f2: Fixture) => {
  if (f1.matchDate === f2.matchDate) {
    return f1.team === '1st' ? -1 : 1;
  }

  return f1.matchDate < f2.matchDate ? -1 : 1;
};

export async function loader() {
  const fixtures = (
    await getClient().fetch(
      `*[_type == "fixture" && matchDate >= now()][0...4]{ _id, matchDate, opposition, team, venue, preview }`
    )
  ).sort(sortFixtures);

  return { fixtures };
}

export const links = () => [
  { rel: 'stylesheet', href: headerStyles },
  { rel: 'stylesheet', href: indexStyles },
  { rel: 'stylesheet', href: upcomingFixtureStyles },
];

export default function Index() {
  const { fixtures } = useLoaderData();
  console.log(fixtures);
  return (
    <div className='page'>
      <div className='main-wrapper'>
        <div className='main'>
          <Header />
          <div className='scroll-container'>
            <main>
              <UpcomingFixtures fixtures={fixtures} />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
