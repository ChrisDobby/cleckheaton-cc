import { useLoaderData, MetaFunction } from 'remix';
import { getClient } from '~/sanity/getClient';
import { Player } from '~/types';

export const meta: MetaFunction = () => ({
  title: 'Cleckheaton Cricket Club News',
});

export async function loader() {
  const players = await getClient().fetch(
    `*[_type == "player"] | order(name asc){ _id, name, "imageUrl":image.asset->url, sponsor,sponsorUrl,"sponsorImageUrl":sponsorImage.asset->url }`
  );

  return {
    players,
  };
}

export default function Index() {
  const { players } = useLoaderData<{ players: Player[] }>();
  return <></>;
}
