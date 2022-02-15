import { News } from '../types';
import NewsItem from './newsItem';

type Props = { news: News[] };

const MobileNews = ({ news }: Props) => (
  <div className='news-list'>
    {news.map((newsItem) => (
      <NewsItem key={newsItem._id} newsItem={newsItem} />
    ))}
  </div>
);

export default MobileNews;
