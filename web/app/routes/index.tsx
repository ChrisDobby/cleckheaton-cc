import { useLoaderData } from 'remix';
import { getClient } from '~/sanity/getClient';
import UpcomingFixtures from '../components/upcomingFixtures';
import NewsAndEvents from '../components/newsAndEvents';
import { Event, Fixture } from '~/types';
import { sortEvents, sortFixtures, sortNews } from '~/sort';

import upcomingFixtureStyles from '../components/upcomingFixtures.css';
import newsAndEventsStyles from '../components/newsAndEvents.css';
import carouselStyles from 'react-responsive-carousel/lib/styles/carousel.min.css';

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
  { rel: 'stylesheet', href: upcomingFixtureStyles },
  { rel: 'stylesheet', href: newsAndEventsStyles },
  { rel: 'stylesheet', href: carouselStyles },
];

export default function Index() {
  const { fixtures, events, news } = useLoaderData();
  return (
    <>
      <UpcomingFixtures fixtures={fixtures} />
      <UpcomingFixtures fixtures={fixtures} swipeable />
      <NewsAndEvents events={events} news={news} />
    </>
  );
}
