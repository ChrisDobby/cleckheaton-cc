import { redirect, useLoaderData } from 'remix';
import { getClient } from '~/sanity/getClient';
import Sponsors from '~/components/sponsors';
import Matchday from '~/components/matchday';
import { Sponsor, Fixture } from '~/types';
import { sortSponsors, sortFixtures } from '~/sort';
import { transformMatchDay } from '~/transform';
import { getMatchDates, isMatchDay } from '~/matchDays';

import sponsorsStyles from '../components/sponsors.css';
import matchdayStyles from '../components/matchday.css';

export const links = () => [
  { rel: 'stylesheet', href: sponsorsStyles },
  { rel: 'stylesheet', href: matchdayStyles },
];

export async function loader() {
  const today = new Date();

  if (!isMatchDay(today)) {
    return redirect('/');
  }

  const [fromMatchDate, toMatchDate] = getMatchDates(today);
  const [fixtures, sponsors] = (await Promise.all([
    getClient().fetch(
      `*[_type == "fixture" && matchDate >= datetime(${fromMatchDate}) && matchDate <= datetime(${toMatchDate})]{ _id, matchDate, opposition, team, venue, preview, matchballSponsor, matchballSponsorUrl, competition->{name} }`
    ),
    getClient().fetch(
      `*[_type == "sponsor"]{ _id, title, url, position, "imageUrl":image.asset->url }`
    ),
  ])) as [Fixture[], Sponsor[]];

  return {
    matchDay: transformMatchDay(fixtures.sort(sortFixtures), today),
    sponsors: sponsors.sort(sortSponsors),
  };
}

export default function Index() {
  const {
    sponsors,
    matchDay: { todaysFixtures, tomorrowsFixtures, yesterdaysFixtures },
  } = useLoaderData();

  return (
    <>
      <Sponsors sponsors={sponsors} />
      <Matchday day='TODAY' fixtures={todaysFixtures} />
      <Matchday day='YESTERDAY' fixtures={yesterdaysFixtures} />
      <Matchday day='TOMORROW' fixtures={tomorrowsFixtures} />
    </>
  );
}
