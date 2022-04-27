import { useLoaderData, MetaFunction } from 'remix';
import { getClient } from '~/sanity/getClient';
import MatchdayFixture from '~/components/matchdayFixture';
import { idCatchBoundary } from '~/catchBoundary';

import matchdayStyles from '~/components/matchday.css';
import matchballSponsorStyles from '~/components/matchballSponsor.css';
import teamListStyles from '~/components/teamList.css';

export const meta: MetaFunction = ({ data }) => {
  if (!data) {
    return {
      title: 'Match not found',
    };
  }
  const {
    fixture: { venue, team, opposition },
  } = data;
  return {
    title: `${team} team v ${opposition} (${venue})`,
  };
};

export const links = () => [
  { rel: 'stylesheet', href: matchdayStyles },
  { rel: 'stylesheet', href: matchballSponsorStyles },
  { rel: 'stylesheet', href: teamListStyles },
];

export async function loader({ params }: { params: { id: string } }) {
  const { id } = params;
  const [fixture] = await getClient().fetch(
    `*[_type == "fixture" && _id == "${id}"]{ _id, matchDate, opposition, team, venue, "hasPreview": defined(preview), "hasReport": defined(report), result, matchballSponsor, matchballSponsorUrl, teamSelection[]->{_id,name,sponsor,sponsorUrl,"sponsorImageUrl":sponsorImage.asset->url}, competition->{name} }`
  );
  if (!fixture) {
    throw new Response('Not Found', { status: 404 });
  }

  return { fixture };
}

export const CatchBoundary = idCatchBoundary('match');

export default function Index() {
  const { fixture } = useLoaderData();

  return (
    <div
      style={{
        marginTop: '1rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '30rem',
      }}
    >
      <MatchdayFixture fixture={fixture} />
    </div>
  );
}
