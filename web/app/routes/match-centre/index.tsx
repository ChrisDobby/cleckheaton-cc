import { redirect, useLoaderData } from 'remix';
import { getClient } from '~/sanity/getClient';
import Sponsors from '~/components/sponsors';
import { Sponsor, Fixture } from '~/types';
import { sortSponsors } from '~/sort';
import { transformMatchDay } from '~/transform';

import sponsorsStyles from '../components/sponsors.css';
import { isMatchDay } from '~/matchDays';

export const links = () => [{ rel: 'stylesheet', href: sponsorsStyles }];

export async function loader() {
  const today = new Date();

  if (!isMatchDay(today)) {
    return redirect('/');
  }

  const [fixtures, sponsors] = (await Promise.all([
    getClient().fetch(
      `*[_type == "fixture" && matchDate >= now()]{ _id, matchDate, opposition, team, venue, preview, matchballSponsor, matchballSponsorUrl, competition->{name} }`
    ),
    getClient().fetch(
      `*[_type == "sponsor"]{ _id, title, url, position, "imageUrl":image.asset->url }`
    ),
  ])) as [Fixture[], Sponsor[]];

  return {
    matchDay: transformMatchDay(fixtures, today),
    sponsors: sponsors.sort(sortSponsors),
  };
}

export default function Index() {
  const { sponsors } = useLoaderData();

  return (
    <>
      <Sponsors sponsors={sponsors} />
      <div>The match centre</div>
    </>
  );
}
