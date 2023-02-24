import { useLoaderData } from '@remix-run/react';
import { MetaFunction } from '@remix-run/node';
import { getClient } from '~/sanity/getClient';
import NewsList from '~/components/newsList';
import { News } from '~/types';
import newsStyles from '~/components/newsAndEvents.css';

export const meta: MetaFunction = () => ({
  title: 'Cleckheaton Cricket Club News',
});

export async function loader() {
  const news = await getClient().fetch(`*[_type == "news"] | order(date desc) [0...20]{ _id, date, title, subtitle, "imageUrl":image.asset->url }`);

  return {
    news,
  };
}

export const links = () => [{ rel: 'stylesheet', href: newsStyles }];

export default function Index() {
  const { news } = useLoaderData<{ news: News[] }>();
  return <NewsList news={news} alwaysVisible />;
}
