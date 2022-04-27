import { useLoaderData, redirect } from 'remix';
import { getClient } from '~/sanity/getClient';
import UpcomingFixtures from '../components/upcomingFixtures';
import NewsAndEvents from '../components/newsAndEvents';
import Sponsors from '~/components/sponsors';
import LatestResults from '~/components/latestResults';
import { Event, Fixture, MatchResult, News, Sponsor } from '~/types';
import { sortFixtures, sortSponsors } from '~/sort';
import { transformLatestResult } from '~/transform';
import { isMatchDay } from '~/matchDays';

import upcomingFixtureStyles from '../components/upcomingFixtures.css';
import newsAndEventsStyles from '../components/newsAndEvents.css';
import sponsorsStyles from '../components/sponsors.css';
import latestResultsStyles from '../components/latestResults.css';
import matchballSponsorStyles from '../components/matchballSponsor.css';
import carouselStyles from 'react-responsive-carousel/lib/styles/carousel.min.css';

export async function loader() {
  if (isMatchDay(new Date())) {
    return redirect('/match-centre');
  }

  const [fixtures, events, news, sponsors, latestResults] = (await Promise.all([
    getClient().fetch(
      `*[_type == "fixture" && matchDate >= now()] | order(matchDate asc)[0...4]{ _id, matchDate, opposition, team, venue, "hasPreview": defined(preview), matchballSponsor, matchballSponsorUrl, competition->{name} }`
    ),
    getClient().fetch(
      `*[_type == "event" && eventDate >= now()] | order(eventDate asc) [0...4]{ _id, eventDate, title, subtitle }`
    ),
    getClient().fetch(
      `*[_type == "news" && showOnHomepage == true] | order(date desc){ _id, date, title, subtitle, "imageUrl":image.asset->url }`
    ),
    getClient().fetch(
      `*[_type == "sponsor"]{ _id, title, url, position, "imageUrl":image.asset->url }`
    ),
    getClient().fetch(
      `*[_type == "fixture" && dateTime(matchDate) < dateTime(now()) && dateTime(matchDate) > dateTime(now()) - 60*60*24*7 && defined(result)] | order(matchDate desc){ _id, matchDate, opposition, team, venue, result, "hasReport": defined(report), scorecard }`
    ),
  ])) as [Fixture[], Event[], News[], Sponsor[], Fixture[]];

  return {
    fixtures: fixtures.sort(sortFixtures),
    events,
    news,
    sponsors: sponsors.sort(sortSponsors),
    latestResults: latestResults.map(transformLatestResult),
  };
}

export const links = () => [
  { rel: 'stylesheet', href: upcomingFixtureStyles },
  { rel: 'stylesheet', href: newsAndEventsStyles },
  { rel: 'stylesheet', href: sponsorsStyles },
  { rel: 'stylesheet', href: latestResultsStyles },
  { rel: 'stylesheet', href: matchballSponsorStyles },
  { rel: 'stylesheet', href: carouselStyles },
];

export default function Index() {
  const { fixtures, events, news, sponsors, latestResults } = useLoaderData<{
    fixtures: Fixture[];
    events: Event[];
    news: News[];
    sponsors: Sponsor[];
    latestResults: MatchResult[];
  }>();

  return (
    <>
      <UpcomingFixtures fixtures={fixtures} />
      <UpcomingFixtures fixtures={fixtures} swipeable />
      <Sponsors sponsors={sponsors} />
      <LatestResults results={latestResults} />
      <NewsAndEvents events={events} news={news} />
    </>
  );
}
