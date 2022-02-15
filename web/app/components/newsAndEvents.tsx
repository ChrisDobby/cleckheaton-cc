import { Event, News } from '../types';
import Events from './events';
import MobileNews from './mobileNews';

type Props = {
  events: Event[];
  news: News[];
};

const NewsAndEvents = ({ events, news }: Props) => (
  <div className='news-events-grid'>
    <Events events={events} />
    <MobileNews news={news} />
  </div>
);

export default NewsAndEvents;
