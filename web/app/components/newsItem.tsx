import { Link } from 'remix';
import { News } from '../types';

type Props = { newsItem: News };

const NewsItem = ({ newsItem }: Props) => (
  <Link className='news-item' to={`/news/${newsItem._id}`}>
    <h4 className='news-title'>{newsItem.title}</h4>
    {newsItem.imageUrl && (
      <img className='news-image' src={newsItem.imageUrl} />
    )}
    <p className='news-subtitle'>{newsItem.subtitle}</p>
  </Link>
);

export default NewsItem;
