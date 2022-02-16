import { Event, News } from '../types';
import Events from './events';
import NewsCarousel from './newsCarousel';
import NewsList from './newsList';

type Props = {
  events: Event[];
  news: News[];
};

const NewsAndEvents = ({ events, news }: Props) => (
  <div className='news-events-grid'>
    <Events events={events} />
    <NewsList news={news} />
    <NewsCarousel news={news} />
  </div>
);

export default NewsAndEvents;
