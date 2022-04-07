import { useLoaderData } from 'remix';
import { getClient } from '~/sanity/getClient';
import UpcomingFixtures from '../components/upcomingFixtures';
import NewsAndEvents from '../components/newsAndEvents';
import Sponsors from '~/components/sponsors';
import { Event, Fixture, News, Sponsor } from '~/types';
import { sortFixtures, sortSponsors } from '~/sort';

import upcomingFixtureStyles from '../components/upcomingFixtures.css';
import newsAndEventsStyles from '../components/newsAndEvents.css';
import sponsorsStyles from '../components/sponsors.css';
import carouselStyles from 'react-responsive-carousel/lib/styles/carousel.min.css';

export async function loader() {
  const [fixtures, events, news, sponsors] = (await Promise.all([
    getClient().fetch(
      `*[_type == "fixture" && matchDate >= now()] | order(matchDate asc)[0...4]{ _id, matchDate, opposition, team, venue, preview, competition->{name} }`
    ),
    getClient().fetch(
      `*[_type == "event" && eventDate >= now()] | order(eventDate asc) [0...4]{ _id, eventDate, title, subtitle }`
    ),
    getClient().fetch(
      `*[_type == "news"] | order(date desc) [0...4]{ _id, date, title, subtitle, "imageUrl":image.asset->url }`
    ),
    getClient().fetch(
      `*[_type == "sponsor"]{ _id, title, url, position, "imageUrl":image.asset->url }`
    ),
  ])) as [Fixture[], Event[], News[], Sponsor[]];

  return {
    fixtures: fixtures.sort(sortFixtures),
    events,
    news,
    sponsors: sponsors.sort(sortSponsors),
  };
}

export const links = () => [
  { rel: 'stylesheet', href: upcomingFixtureStyles },
  { rel: 'stylesheet', href: newsAndEventsStyles },
  { rel: 'stylesheet', href: sponsorsStyles },
  { rel: 'stylesheet', href: carouselStyles },
];

export default function Index() {
  const { fixtures, events, news, sponsors } = useLoaderData();
  return (
    <>
      <UpcomingFixtures fixtures={fixtures} />
      <UpcomingFixtures fixtures={fixtures} swipeable />
      <Sponsors sponsors={sponsors} />
      <NewsAndEvents events={events} news={news} />
    </>
  );
}
