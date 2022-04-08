import { News } from '../types';
import NewsItem from './newsItem';

type Props = { news: News[]; alwaysVisible?: boolean };

const NewsList = ({ news, alwaysVisible }: Props) => (
  <div className={`news-list ${alwaysVisible ? 'always-visible' : ''}`}>
    {news.map((newsItem) => (
      <NewsItem key={newsItem._id} newsItem={newsItem} />
    ))}
  </div>
);

export default NewsList;
