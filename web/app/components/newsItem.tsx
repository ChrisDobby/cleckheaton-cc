import { News } from '../types';

type Props = { newsItem: News };

const NewsItem = ({ newsItem }: Props) => (
  <article className='news-item'>
    <h4 className='news-title'>{newsItem.title}</h4>
    {newsItem.imageUrl && (
      <img className='news-image' src={newsItem.imageUrl} />
    )}
    <p className='news-subtitle'>{newsItem.subtitle}</p>
  </article>
);

export default NewsItem;
