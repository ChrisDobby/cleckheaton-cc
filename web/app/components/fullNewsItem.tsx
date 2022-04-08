import { News } from '~/types';
import { PortableText } from '@portabletext/react';

type Props = { newsItem: News };

const FullNewsItem = ({ newsItem }: Props) => (
  <div className='full-news-item'>
    <h4 className='full-news-title'>{newsItem.title}</h4>
    <p className='full-news-subtitle'>{newsItem.subtitle}</p>
    {newsItem.imageUrl && (
      <img className='news-image' src={newsItem.imageUrl} />
    )}
    <div className='full-news-text'>
      <PortableText value={newsItem.description} />
    </div>
  </div>
);

export default FullNewsItem;
