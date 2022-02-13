import { useLoaderData } from 'remix';
import { getClient } from '~/sanity/getClient';
import Header from '../components/header';
import UpcomingFixtures from '../components/upcomingFixtures';

import headerStyles from '../components/header.css';
import indexStyles from '../styles/index.css';

export async function loader() {
  const fixtures = await getClient().fetch(
    `*[_type == "fixture" && matchDate >= now()][0...4]{ _id, matchDate, opposition, team, venue, preview }`
  );

  return { fixtures };
}

export const links = () => [
  { rel: 'stylesheet', href: headerStyles },
  { rel: 'stylesheet', href: indexStyles },
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
