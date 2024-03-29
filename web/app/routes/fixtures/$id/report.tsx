import { useLoaderData } from '@remix-run/react';
import { MetaFunction } from '@remix-run/node';
import { getClient } from '~/sanity/getClient';
import { MatchReport } from '~/types';
import Article from '~/components/article';
import { transformReport } from '~/transform';
import { idCatchBoundary } from '~/catchBoundary';

import articletStyles from '~/components/article.css';

export const meta: MetaFunction = ({ data, params }) => {
  if (!data) {
    return {
      title: 'Match report not found',
      description: `No match report with id ${params.id} found`,
    };
  }

  const {
    result: { result },
  } = data;
  return {
    title: result,
    description: 'Cleckheaton CC match report',
  };
};

export async function loader({ params }: { params: { id: string } }) {
  const { id } = params;
  const [fixture] = await getClient().fetch(`*[_type == "fixture" && _id == "${id}"]{ _id, matchDate, opposition, team, venue, result, report, scorecard }`);

  if (!fixture || !fixture.report) {
    throw new Response('Not Found', { status: 404 });
  }

  console.log(fixture);

  return { result: transformReport(fixture) };
}

export const links = () => [{ rel: 'stylesheet', href: articletStyles }];

export const CatchBoundary = idCatchBoundary('match report');

export default function Index() {
  const { result } = useLoaderData<{ result: MatchReport }>();
  console.log(result);
  return (
    <Article title={`${result.date}: ${result.description}`} subtitle={result.result} text={result.report}>
      {result.scorecard && (
        <a style={{ color: '#fff' }} href={result.scorecard} target="_blank">
          Scorecard
        </a>
      )}
    </Article>
  );
}
