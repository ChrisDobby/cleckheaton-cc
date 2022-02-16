import { useLoaderData } from 'remix';
import { getClient } from '~/sanity/getClient';
import Header from '../components/header';
import UpcomingFixtures from '../components/upcomingFixtures';
import NewsAndEvents from '../components/newsAndEvents';
import { Event, Fixture, News } from '~/types';

import headerStyles from '../components/header.css';
import upcomingFixtureStyles from '../components/upcomingFixtures.css';
import newsAndEventsStyles from '../components/newsAndEvents.css';
import indexStyles from '../styles/index.css';
import carouselStyles from 'react-responsive-carousel/lib/styles/carousel.min.css';

const sortEvents = (e1: Event, e2: Event) =>
  e1.eventDate < e2.eventDate ? 1 : -1;
const sortNews = (n1: News, n2: News) => (n1.date < n2.date ? 1 : -1);

const sortFixtures = (f1: Fixture, f2: Fixture) => {
  if (f1.matchDate === f2.matchDate) {
    return f1.team === '1st' ? -1 : 1;
  }

  return f1.matchDate < f2.matchDate ? -1 : 1;
};

export async function loader() {
  const [fixtures, events, news] = (await Promise.all([
    getClient().fetch(
      `*[_type == "fixture" && matchDate >= now()][0...4]{ _id, matchDate, opposition, team, venue, preview, competition->{name} }`
    ),
    getClient().fetch(
      `*[_type == "event" && eventDate >= now()][0...4]{ _id, eventDate, title, subtitle }`
    ),
    getClient().fetch(
      `*[_type == "news"][0...4]{ _id, date, title, subtitle, "imageUrl":image.asset->url }`
    ),
  ])) as [Fixture[], Event[], any[]];

  return {
    fixtures: fixtures.sort(sortFixtures),
    events: events.sort(sortEvents),
    news: news.sort(sortNews),
  };
}

export const links = () => [
  { rel: 'stylesheet', href: headerStyles },
  { rel: 'stylesheet', href: indexStyles },
  { rel: 'stylesheet', href: upcomingFixtureStyles },
  { rel: 'stylesheet', href: newsAndEventsStyles },
  { rel: 'stylesheet', href: carouselStyles },
];

export default function Index() {
  const { fixtures, events, news } = useLoaderData();
  return (
    <div className='page'>
      <div className='main-wrapper'>
        <div className='main'>
          <Header />
          <div className='scroll-container'>
            <main>
              <UpcomingFixtures fixtures={fixtures} />
              <NewsAndEvents events={events} news={news} />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
