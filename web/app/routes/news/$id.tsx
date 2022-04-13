import { useLoaderData, MetaFunction } from 'remix';
import { getClient } from '~/sanity/getClient';
import { News } from '~/types';
import Article from '~/components/article';

import articleStyles from '~/components/article.css';

export const meta: MetaFunction = ({ data }) => {
  const { title, subTitle } = data;
  return {
    title,
    description: subTitle,
  };
};

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

export const links = () => [{ rel: 'stylesheet', href: articleStyles }];

export default function Index() {
  const { newsItem } = useLoaderData() as { newsItem: News };
  return <Article {...newsItem} text={newsItem.description} />;
}
