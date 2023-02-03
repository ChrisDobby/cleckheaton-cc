import { useLoaderData } from '@remix-run/react';
import { MetaFunction } from '@remix-run/node';
import { getClient } from '~/sanity/getClient';
import { MatchPreview } from '~/types';
import Article from '~/components/article';
import { transformPreview } from '~/transform';
import { idCatchBoundary } from '~/catchBoundary';

import articletStyles from '~/components/article.css';

export const meta: MetaFunction = ({ data, params }) => {
  if (!data) {
    return {
      title: 'Match preview not found',
      description: `No match preview with id ${params.id} found`,
    };
  }
  const {
    preview: { description },
  } = data;
  return {
    title: description,
    description: 'Cleckheaton CC match preview>',
  };
};

export async function loader({ params }: { params: { id: string } }) {
  const { id } = params;
  const [fixture] = await getClient().fetch(`*[_type == "fixture" && _id == "${id}"]{ _id, matchDate, opposition, team, venue, result, preview }`);

  if (!fixture || !fixture.preview) {
    throw new Response('Not Found', { status: 404 });
  }

  return { preview: transformPreview(fixture) };
}

export const links = () => [{ rel: 'stylesheet', href: articletStyles }];

export const CatchBoundary = idCatchBoundary('match preview');

export default function Index() {
  const { preview } = useLoaderData<{ preview: MatchPreview }>();
  return <Article title={preview.description} subtitle={preview.date} text={preview.preview} />;
}
