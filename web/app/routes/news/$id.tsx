import { useLoaderData } from 'remix';
import { getClient } from '~/sanity/getClient';
import { News } from '~/types';
import newsStyles from '~/components/fullNewsItem.css';
import FullNewsItem from '~/components/fullNewsItem';

export async function loader({ params }: { params: { id: string } }) {
  const { id } = params;
  const [newsItem] = await getClient().fetch(
    `*[_type == "news" && _id == "${id}"]{ _id, date, title, subtitle, description, "imageUrl":image.asset->url }`
  );

  if (!newsItem) {
    throw new Response('Not Found', { status: 404 });
  }

  return { newsItem };
}

export const links = () => [{ rel: 'stylesheet', href: newsStyles }];

export default function Index() {
  const { newsItem } = useLoaderData() as { newsItem: News };
  return <FullNewsItem newsItem={newsItem} />;
}
