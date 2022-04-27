import { useLoaderData, MetaFunction } from 'remix';
import { getClient } from '~/sanity/getClient';
import { Player } from '~/types';
import PlayerList from '~/components/playerList';

import playersStyles from '~/components/playerList.css';
import playerSponsorStyles from '~/components/playerSponsor.css';

export const meta: MetaFunction = () => ({
  title: 'Cleckheaton Cricket Club Players',
});

export async function loader() {
  const players = await getClient().fetch(
    `*[_type == "player"] | order(name asc){ _id, name, "imageUrl":image.asset->url, sponsor,sponsorUrl,"sponsorImageUrl":sponsorImage.asset->url }`
  );

  return {
    players,
  };
}

export const links = () => [
  { rel: 'stylesheet', href: playerSponsorStyles },
  { rel: 'stylesheet', href: playersStyles },
];

export default function Index() {
  const { players } = useLoaderData<{ players: Player[] }>();
  return <PlayerList players={players} />;
}
